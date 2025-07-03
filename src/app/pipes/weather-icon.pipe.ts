import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {weatherEmojiMap} from '../constants/weather-emoji.constant'
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
