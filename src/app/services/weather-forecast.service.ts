import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { WeatherDataResponse } from '../models/weather-response.model';


@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {


  constructor(private http: HttpClient) { }
  getCoordinates(city: string): Observable<{ lat: number; lon: number }> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
    return this.http.get<any>(url)
      .pipe(
        map(response => {
          debugger;
          const exactMatch = response.results?.find(
            (item: any) => item.name.toLowerCase() === city.toLowerCase()
          );
          if (exactMatch) {
            return { lat: exactMatch.latitude, lon: exactMatch.longitude };
          }
          throw new Error('City not found');

        }),
        catchError(error => {
          return throwError(() => new Error("City not found"));
        })
      );
  }

  getWeather(lat: number, lon: number): Observable<WeatherDataResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=temperature_2m,weathercode&timezone=auto`;
    return this.http.get<WeatherDataResponse>(url)
      .pipe(catchError(error => {
        console.error('Error fetching weather:', error);
        return throwError(() =>
          new Error('Failed to fetch weather data. Please try again later.'))
      }));
  }

  getCityWeather(city: string): Observable<WeatherDataResponse> {
    return this.getCoordinates(city).pipe(
      switchMap(coords => this.getWeather(coords.lat, coords.lon)),
      catchError(error => {
        return throwError(() => new Error('Failed to fetch weather data. Please try again later.'))
      })
    );
  }
}
