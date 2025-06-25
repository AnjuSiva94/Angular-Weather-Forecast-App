import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherIcon',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class WeatherIconPipe implements PipeTransform {

  transform(code: number): string {
    if (code === undefined || code === null) return '❓';

    if ([0].includes(code)) return '☀️'; // Clear
    if ([1, 2].includes(code)) return '🌤️'; // Mostly Clear / Partly Cloudy
    if ([3].includes(code)) return '☁️'; // Overcast
    if ([45, 48].includes(code)) return '🌫️'; // Fog
    if ([51, 53, 55, 56, 57].includes(code)) return '🌦️'; // Drizzle
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️'; // Rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'; // Snow
    if ([95, 96, 99].includes(code)) return '⛈️'; // Thunderstorm

    return '❓'; // Fallback
  }

}
