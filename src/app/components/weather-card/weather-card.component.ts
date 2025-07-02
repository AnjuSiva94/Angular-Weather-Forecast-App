import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';
import { WeekDayPipe } from '../../pipes/week-day.pipe';
import { DateSuffixPipe } from '../../pipes/date-suffix.pipe';


@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [
    MatCardModule,
    WeatherIconPipe,
    WeekDayPipe,
    DateSuffixPipe],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  @Input() date!: string;
  @Input() max!: number;
  @Input() min!: number;
  @Input() code!: number;


}
