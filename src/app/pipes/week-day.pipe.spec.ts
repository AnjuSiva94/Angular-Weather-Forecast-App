import { WeekDayPipe } from './week-day.pipe';

fdescribe('WeekDayPipe', () => {

  let pipe :WeekDayPipe;
  beforeEach(()=>{
      pipe = new WeekDayPipe();
  })

  it('create an instance', () => {
    
    expect(pipe).toBeTruthy();
  });

  it('should transform 2025-06-01 to "Sun" ',()=>{
    expect(pipe.transform('2025-06-01')).toBe('Sun')
  })
});
