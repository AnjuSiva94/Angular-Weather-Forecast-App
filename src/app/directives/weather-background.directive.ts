import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWeatherBackground]'
})
export class WeatherBackgroundDirective {

 @Input('appWeatherBackground') code: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const bgClass = this.getBackgroundClass(this.code);

    this.renderer.removeAttribute(this.el.nativeElement, 'class'); // clear old classes
    this.renderer.addClass(this.el.nativeElement, bgClass);
  }

  private getBackgroundClass(code: number): string {
    if ([0, 1].includes(code)) return 'bg-sunny';
    if ([2, 3].includes(code)) return 'bg-cloudy';
    if ([45, 48].includes(code)) return 'bg-foggy';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'bg-rainy';
    if ([71, 73, 75, 85, 86].includes(code)) return 'bg-snowy';
    if ([95, 96, 99].includes(code)) return 'bg-thunder';

    return 'bg-default';
  }

}
