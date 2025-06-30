import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { DebugElement, inject } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

const now = new Date();
const todayStr = now.toISOString().split('T')[0];
const nextHour = now.getHours() + 1;

const time1 = `${todayStr}T${String(nextHour + 1).padStart(2, '0')}:00`;
const time2 = `${todayStr}T${String(nextHour + 2).padStart(2, '0')}:00`;

const mockData = {
  daily: {
    time: [todayStr],
    temperature_2m_min: [23],
    temperature_2m_max: [33],
    weathercode: [1]
  },
  hourly: {
    time: [time1, time2],
    temperature_2m: [25, 26],
    weathercode: [1, 2]
  }
};

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  let weatherServiceSpy: jasmine.SpyObj<WeatherForecastService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;


  beforeEach(async () => {

    const weatherSpy = jasmine.createSpyObj('WeatherForecastService', ['getCityWeather'])
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open'])

    weatherSpy.getCityWeather.and.returnValue(of(mockData));


    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: WeatherForecastService, useValue: weatherSpy },
        { provide: MatSnackBar, useValue: snackSpy },
        WeatherIconPipe,
        TimeFormatPipe,
        provideHttpClient(),
        provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    weatherServiceSpy = TestBed.inject(WeatherForecastService) as jasmine.SpyObj<WeatherForecastService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  })


  it('should call fetchweather then return mock data and update the required',
    fakeAsync(() => {
      weatherServiceSpy.getCityWeather.and.returnValue(of(mockData))
      component.fetchWeather();
      tick();

      expect(component.weatherData()).toEqual(mockData);
      expect(component.currentMinTempSig()).toEqual(23);
      expect(component.currentMaxTempSig()).toEqual(33);
      expect(component.currentCodeSig()).toEqual(1);

      expect(component.error()).toEqual('');
      expect(component.loading()).toBeFalse();
      expect(component.currentTemps().length).toBeGreaterThan(0);


    }))


  it('should call fetchweather then return error if any and update the required ',
    fakeAsync(() => {
      const error_msg = "failed to load weather data";
      weatherServiceSpy.getCityWeather.and.returnValue(throwError(() => new Error(error_msg)));
      component.fetchWeather();
      tick();

      expect(component.error()).toEqual(error_msg);
      expect(component.weatherData()).toBeNull();
      expect(component.loading()).toBeFalse();
      expect(snackBarSpy.open).toHaveBeenCalledWith(error_msg, 'Close', { duration: 3000 });

    })
  )

  it('should update city and call fetchWeather on search', () => {
    spyOn(component, 'fetchWeather');
    component.onSearch('Mumbai');
    expect(component.city()).toBe('Mumbai');
    expect(component.fetchWeather).toHaveBeenCalled();
  });

  it('forecastList should return structured forecast array', () => {
    const forecast = component.forecastList();
    expect(forecast.length).toBe(1);
    expect(forecast[0]).toEqual({
      date: todayStr,
      max: 33,
      min: 23,
      code: 1
    });
  });

});
