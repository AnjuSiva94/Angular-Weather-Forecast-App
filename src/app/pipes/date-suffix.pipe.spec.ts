import { DateSuffixPipe } from './date-suffix.pipe';

describe('DateSuffixPipe', () => {

  let pipe: DateSuffixPipe;

  beforeEach(() => {
    pipe = new DateSuffixPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform 2025-06-01 to "1st June"', () => {
    expect(pipe.transform('2025-06-01')).toBe('1st June');
  });

  it('should transform 2025-06-02 to "2nd June"', () => {
    expect(pipe.transform('2025-06-02')).toBe('2nd June');
  });

  it('should transform 2025-06-03 to "3rd June"', () => {
    expect(pipe.transform('2025-06-03')).toBe('3rd June');
  });

  it('should transform 2025-06-04 to "4th June"', () => {
    expect(pipe.transform('2025-06-04')).toBe('4th June');
  });

  it('should transform 2025-06-11 to "11th June" (teen edge case)', () => {
    expect(pipe.transform('2025-06-11')).toBe('11th June');
  });

  it('should transform 2025-06-21 to "21st June"', () => {
    expect(pipe.transform('2025-06-21')).toBe('21st June');
  });

  it('should return empty string if input is null', () => {
    expect(pipe.transform(null as any)).toBe('');
  });

  it('should return empty string if input is empty', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should transform 2025-06-13 to "13th June"', () => {
    expect(pipe.transform('2025-06-13')).toBe('13th June');
  });


});
