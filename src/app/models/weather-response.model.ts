export interface WeatherDay {
    date: string;
    temperature_max: number;
    temperature_min: number;
    weathercode: number;
  }
  
  export interface WeatherData {
    days: WeatherDay[];
    city: string;
    lat: number;
    lon: number;
  }
  
  