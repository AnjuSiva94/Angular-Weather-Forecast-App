import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: string, format: '12' | '24' = '12'): string {
    if (!time) return '';

    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes)) return '';

    else if (format === '24') {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    else {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;

      return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

  }

}
