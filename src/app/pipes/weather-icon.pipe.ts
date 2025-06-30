import { Injectable, Pipe, PipeTransform } from '@angular/core';
const weatherEmojiMap: { [key: number]: string } = {
  0: '☀️',
  1: '🌤️', 2: '🌤️',
  3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️', 56: '🌦️', 57: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️', 80: '🌧️', 81: '🌧️', 82: '🌧️',
  71: '❄️', 73: '❄️', 75: '❄️', 77: '❄️', 85: '❄️', 86: '❄️',
  95: '⛈️', 96: '⛈️', 99: '⛈️'
};
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
    return weatherEmojiMap[code] || '❓';
  }
  

}
