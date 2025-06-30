import { TimeFormatPipe } from './time-format.pipe';

fdescribe('TimeFormatPipe', () => {

  let pipe: TimeFormatPipe;

  beforeEach(() => {
    pipe = new TimeFormatPipe();
  })

  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('should transform 20:00 to 8:00 PM', () => {
    expect(pipe.transform('20:00')).toBe('8:00 PM')
  })
});
