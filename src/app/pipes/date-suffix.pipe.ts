import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSuffix'
})
export class DateSuffixPipe implements PipeTransform {

  transform(dateStr: string): string {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    const suffix = this.getDaySuffix(day);
   
    return `${day}${suffix} ${month}`;
  }

  private getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

}
