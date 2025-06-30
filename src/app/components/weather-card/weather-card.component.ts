import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';
import { WeekDayPipe } from '../../pipes/week-day.pipe';
import { DateSuffixPipe } from '../../pipes/date-suffix.pipe';


@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [
    MatCardModule, WeatherIconPipe, WeekDayPipe,
    DateSuffixPipe],

  template: `
  <div class="weather-card">
    <mat-card>
      <mat-card-title class="weather-card__title">{{ date | dateSuffix  }} , {{ date | weekDay }}</mat-card-title>
      <mat-card-content>
        <div class="weather-card__icon">{{ code | weatherIcon }}</div>
        <p class="weather-card__max">Max: {{ max }}°C</p>
        <p class="weather-card__min">Min: {{ min }}°C</p>
      </mat-card-content>
    </mat-card>
  </div>
`
  ,
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  @Input() date!: string;
  @Input() max!: number;
  @Input() min!: number;
  @Input() code!: number;


}
