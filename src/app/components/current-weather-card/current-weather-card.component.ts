import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherCodePipe } from '../../pipes/weather-code.pipe';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';

@Component({
  selector: 'app-current-weather-card',
  standalone: true,
  imports: [CommonModule,
     MatCardModule,
      WeatherCodePipe,
      WeatherIconPipe],
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.css'
})
export class CurrentWeatherCardComponent {
 @Input() city!: string;
  @Input() temperature!: number;
  @Input() min!: number;
  @Input() max!: number;
  @Input() code!: number;

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

  getConditionFromCode(code: number): string {
    if ([0].includes(code)) return 'Clear';
    if ([1, 2].includes(code)) return 'Partly Cloudy';
    if ([3].includes(code)) return 'Overcast';
    if ([45, 48].includes(code)) return 'Fog';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Rain';
    if ([71, 73, 75, 85, 86].includes(code)) return 'Snow';
    if ([95, 96, 99].includes(code)) return 'Thunderstorm';
    return 'Unknown';
  }
}
