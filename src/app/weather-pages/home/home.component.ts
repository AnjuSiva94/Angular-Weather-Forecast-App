import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    SearchBarComponent,
    WeatherCardComponent,
    CurrentWeatherCardComponent,
    WeatherIconPipe,
    TimeFormatPipe,
    WeatherBackgroundDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',


})
export class HomeComponent {
  city = signal('Delhi');
  weatherData = signal<any>(null);
  currentTemps = signal<{ time: string; temp: number; icon: string }[]>([]);
  loading = signal(false);
  error = signal('');

  currentTempSig = signal(0);
  currentMaxTempSig = signal(0);
  currentMinTempSig = signal(0);


  constructor(private snackBar: MatSnackBar, private weatherService: WeatherForecastService,
    private http: HttpClient,
    private iconpipe: WeatherIconPipe, private timeformat: TimeFormatPipe) {
    this.fetchWeather();
  }

  fetchWeather() {
    this.loading.set(true);
    this.error.set('Loading...');

    this.weatherService.getCityWeather(this.city())
      .pipe(
        catchError(err => {
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
        this.currentMaxTempSig.set(dailyMax && dailyMax.length > 0 ? dailyMax[0] : 0);
        this.currentMinTempSig.set(dailyMin && dailyMin.length > 0 ? dailyMin[0] : 0);

        this.extractCurrentDayTemps(weather);
        this.error.set('');
        this.loading.set(false);
      });
  }

  fetchWeather_old() {
    this.loading.set(true);
    this.error.set('');
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${this.city()}`;

    this.http.get<any>(geoUrl).subscribe({
      next: geo => {
        const location = geo.results?.[0];
        if (!location) {
          this.error.set('City not found');
          this.loading.set(false);
          return;
        }

        const { latitude, longitude } = location;
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`;

        this.http.get<any>(weatherUrl).subscribe({
          next: weather => {
            this.weatherData.set(weather);
            this.extractCurrentDayTemps(weather);
            this.loading.set(false);
          },
          error: () => {
            this.error.set('Failed to fetch weather');
            this.loading.set(false);
          }
        });
      },
      error: () => {
        this.error.set('Failed to fetch location');
        this.loading.set(false);
      }
    });
  }

  extractCurrentDayTemps(data: any) {
    const today = data.daily.time[0];
    const now = new Date();
    const currentHour = now.getHours();
    const temps: { time: string; temp: number; icon: string }[] = [];

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
            icon: this.iconpipe.transform(hourlyCodes[i])
            // icon: this.getIconFromCode(hourlyCodes[i])
          });
        }
      }
    }

    this.currentTemps.set(temps);
    this.currentTempSig.set(temps.length > 0 ? temps[0].temp : 0);
  }

  getIconFromCode(code: number): string {
    if ([0].includes(code)) return '☀️';
    if ([1, 2].includes(code)) return '🌤️';
    if ([3].includes(code)) return '☁️';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⛈️';
    return '❓';
  }

  currentTemperature() {
    const temps = this.currentTemps();
    return temps.length > 0 ? temps[0].temp : 0;
  }

  currentMinTemp() {
    const dailyMin = this.weatherData()?.daily?.temperature_2m_min;
    return dailyMin && dailyMin.length > 0 ? dailyMin[0] : 0;
  }

  currentMaxTemp() {
    const dailyMax = this.weatherData()?.daily?.temperature_2m_max;
    return dailyMax && dailyMax.length > 0 ? dailyMax[0] : 0;
  }

  currentWeatherCode() {
    const hourlyCodes = this.weatherData()?.hourly?.weathercode;
    const hourlyTimes = this.weatherData()?.hourly?.time;
    const now = new Date();
    const currentHour = now.getHours();
    const today = this.weatherData()?.daily?.time?.[0];

    if (!hourlyTimes || !hourlyCodes || !today) return 0;

    for (let i = 0; i < hourlyTimes.length; i++) {
      if (hourlyTimes[i].startsWith(today)) {
        const hour = parseInt(hourlyTimes[i].split('T')[1]);
        if (hour >= currentHour) {
          return hourlyCodes[i];
        }
      }
    }
    return 0;
  }

  onSearch(cityName: string) {
    if (cityName) {
      this.city.set(cityName);
      this.fetchWeather();
    }
  }

  forecastList = computed(() => {
    const data = this.weatherData();
    if (!data || !data.daily) return [];

    
    const { time, temperature_2m_max, temperature_2m_min, weathercode } = data.daily;
    
    return time.map((date: string, idx: number) => ({
      date,
      max: temperature_2m_max[idx],
      min: temperature_2m_min[idx],
      code: weathercode[idx],
    }));
  });
}
