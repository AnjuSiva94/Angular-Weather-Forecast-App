import { Routes } from '@angular/router';
import { HomeComponent } from './weather-pages/home/home.component';

export const routes: Routes = [
  { path: '**', component: HomeComponent },  
   { path: '\home', component: HomeComponent },  
];
