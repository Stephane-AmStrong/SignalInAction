import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleSelectionComponent } from './vehicles/vehicle-selection/vehicle-selection.component';
import { FilmSelectionComponent } from './films/film-selection/film-selection.component';

export const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'vehicles', component: VehicleSelectionComponent },
   { path: 'films', component: FilmSelectionComponent },
   { path: '**', redirectTo: 'home', pathMatch: 'full' }
];