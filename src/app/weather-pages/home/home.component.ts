import { Component, signal, effect, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { CurrentWeatherCardComponent } from "../../components/current-weather-card/current-weather-card.component";
import { HttpClient } from '@angular/common/http';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { WeatherBackgroundDirective } from '../../directives/weather-background.directive';
import { catchError, of } from 'rxjs';
import { WeatherCodePipe } from "../../pipes/weather-code.pipe";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TitleCasePipe,
    MatCardModule,
    MatProgressSpinnerModule,
    SearchBarComponent,
    WeatherCardComponent,
    CurrentWeatherCardComponent,
    WeatherIconPipe,
    TimeFormatPipe,
    WeatherBackgroundDirective, WeatherCodePipe,
    MatAutocompleteModule,
    MatFormFieldModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',


})
export class HomeComponent {
  city = signal('Delhi');
  weatherData = signal<any>(null);
  currentTemps = signal<{ time: string; temp: number; icon: string; code: number }[]>([]);
  loading = signal(false);
  error = signal('');

  currentTempSig = signal(0);
  currentMaxTempSig = signal(0);
  currentMinTempSig = signal(0);
  currentCodeSig = signal(0);




  constructor(private snackBar: MatSnackBar, private weatherService: WeatherForecastService,
    private http: HttpClient,
    private iconpipe: WeatherIconPipe, private timeformat: TimeFormatPipe) {
    this.fetchWeather();




  }

  onSearch(cityName: string) {
    if (cityName) {
      this.city.set(cityName);
      this.fetchWeather();
    }
  }


  fetchWeather() {
    this.loading.set(true);
    this.error.set('Loading...');

    this.weatherService.getCityWeather(this.city())
      .pipe(
        catchError(err => {
          this.weatherData.set(null);
          this.error.set(err.message || 'Unknown error');
          this.snackBar.open(err.message || 'Failed to load weather', 'Close', { duration: 3000 });
          this.loading.set(false);
          return of(null);
        })
      ).subscribe(weather => {
        if (!weather) return;
        this.weatherData.set(weather);

        const dailyMin = this.weatherData()?.daily?.temperature_2m_min;
        const dailyMax = this.weatherData()?.daily?.temperature_2m_max;
        const dailyWeatherCode = this.weatherData()?.daily?.weathercode;

        this.currentCodeSig.set(dailyWeatherCode && dailyWeatherCode.length > 0 ? dailyWeatherCode[0] : 0);
        this.currentMaxTempSig.set(dailyMax && dailyMax.length > 0 ? dailyMax[0] : 0);
        this.currentMinTempSig.set(dailyMin && dailyMin.length > 0 ? dailyMin[0] : 0);

        this.extractCurrentDayTemps(weather);
        this.error.set('');
        this.loading.set(false);
      });
  }

  extractCurrentDayTemps(data: any) {
    const today = data.daily.time[0];
    const now = new Date();
    const currentHour = now.getHours();
    const temps: { time: string; temp: number; icon: string; code: number }[] = [];

    const hourlyTimes = data.hourly.time;
    const hourlyTemps = data.hourly.temperature_2m;
    const hourlyCodes = data.hourly.weathercode;

    for (let i = 0; i < hourlyTimes.length; i++) {
      if (hourlyTimes[i].startsWith(today)) {
        const hour = parseInt(hourlyTimes[i].split('T')[1].split(':')[0], 10);
        if (hour >= currentHour) {
          temps.push({
            time: this.timeformat.transform(hourlyTimes[i].split('T')[1]),
            temp: hourlyTemps[i],
            icon: this.iconpipe.transform(hourlyCodes[i]),
            code: hourlyCodes[i]
          });
        }
      }
    }

    this.currentTemps.set(temps);

    this.currentTempSig.set(temps.length > 0 ? temps[0].temp : 0);
  }

  forecastList = computed(() => {
    const data = this.weatherData();
    if (!data || !data.daily) return [];


    const { time, temperature_2m_max, temperature_2m_min, weathercode } = data.daily;
    if (!Array.isArray(time)) return [];

    return time.map((date: string, idx: number) => ({
      date,
      max: temperature_2m_max[idx],
      min: temperature_2m_min[idx],
      code: weathercode[idx],
    }));
  });


}
