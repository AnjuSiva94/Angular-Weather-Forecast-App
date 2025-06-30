import { WeatherCodePipe } from './weather-code.pipe';

fdescribe('WeatherCodePipe', () => {
  let pipe: WeatherCodePipe;
  beforeEach(() => {
    pipe = new WeatherCodePipe();
  })

  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('should return "Clear sky" for code 0', () => {
    expect(pipe.transform(0)).toBe('Clear sky')
  })
});
