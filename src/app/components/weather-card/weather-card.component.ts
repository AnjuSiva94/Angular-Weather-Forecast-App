import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';
import { WeekDayPipe } from '../../pipes/week-day.pipe';
import { DateSuffixPipe } from '../../pipes/date-suffix.pipe';


@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule,
     MatCardModule,WeatherIconPipe,WeekDayPipe,
    DateSuffixPipe],
 
  template: `
  <mat-card>
    <mat-card-title>{{ date | dateSuffix  }} , {{ date | weekDay }}</mat-card-title>
    <mat-card-content>
       <div style="font-size: 24px;">{{ code | weatherIcon }}</div>
      <p>Max: {{ max }}°C</p>
      <p>Min: {{ min }}°C</p>
      <!-- <p>Code: {{ code }}</p> -->
    </mat-card-content>
  </mat-card>
`
  ,
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  @Input() date!: string;
  @Input() max!: number;
  @Input() min!: number;
  @Input() code!: number;

  getIconFromCode(code: number): string {
    if ([0].includes(code)) return '☀️'; // Clear
    if ([1, 2].includes(code)) return '🌤️'; // Partly cloudy
    if ([3].includes(code)) return '☁️'; // Overcast
    if ([45, 48].includes(code)) return '🌫️'; // Fog
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'; // Rain
    if ([71, 73, 75, 85, 86].includes(code)) return '❄️'; // Snow
    if ([95, 96, 99].includes(code)) return '⛈️'; // Thunderstorm
    return '❓';
  }
}
