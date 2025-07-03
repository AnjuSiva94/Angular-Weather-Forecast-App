export interface WeatherDataResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  timezone: string;
  daily: DailyData;
  hourly: HourlyData;
}

export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
}
