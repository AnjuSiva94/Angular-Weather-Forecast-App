import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherCodePipe } from '../../pipes/weather-code.pipe';
import { WeatherIconPipe } from '../../pipes/weather-icon.pipe';

@Component({
  selector: 'app-current-weather-card',
  standalone: true,
  imports: [TitleCasePipe,
    MatCardModule,
    WeatherCodePipe,
    WeatherIconPipe],
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.scss'
})
export class CurrentWeatherCardComponent {
  @Input() city!: string;
  @Input() temperature!: number;
  @Input() min!: number;
  @Input() max!: number;
  @Input() code!: number;
}
