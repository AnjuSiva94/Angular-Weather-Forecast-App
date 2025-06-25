import { WeatherCodePipe } from './weather-code.pipe';

describe('WeatherCodePipe', () => {
  it('create an instance', () => {
    const pipe = new WeatherCodePipe();
    expect(pipe).toBeTruthy();
  });
});
