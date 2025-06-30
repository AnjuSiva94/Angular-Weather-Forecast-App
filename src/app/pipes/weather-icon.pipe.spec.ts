import { WeatherIconPipe } from './weather-icon.pipe';

fdescribe('WeatherIconPipe', () => {
  let pipe: WeatherIconPipe;
  beforeEach(() => {
    pipe = new WeatherIconPipe();
  })

  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

   it('should return correct icon', () => {

    expect(pipe.transform(0)).toBe('☀️');
  });
});
