import { Pipe, PipeTransform } from '@angular/core';
import {weatherDescriptions} from '../constants/weather-code'
@Pipe({
  name: 'weathercode',
  standalone: true,

})
export class WeatherCodePipe implements PipeTransform {


  transform(code: number): string {
    if (code === undefined || code === null) return 'Unknown';
    return weatherDescriptions[code] || 'Unknown';
  }

 

}
