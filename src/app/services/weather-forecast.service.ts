import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  
  constructor(private http: HttpClient) { }
  getCoordinates(city: string): Observable<{ lat: number; lon: number }> {
    return this.http.get<any>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      .pipe(
        map(response => {
          debugger;
          const loc = response.results?.[0];
          if (!loc) throw new Error('City not found');
          return { lat: loc.latitude, lon: loc.longitude };
        })
      );
  }

  getWeather(lat: number, lon: number): Observable<any> {
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`;
    return this.http.get(url);
  }

  getCityWeather(city: string): Observable<any> {
    return this.getCoordinates(city).pipe(
      switchMap(coords => this.getWeather(coords.lat, coords.lon))
    );
  }
}
