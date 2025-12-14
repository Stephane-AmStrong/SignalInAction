import { Component, signal } from '@angular/core';
import { VehicleSelection } from "./vehicle-selection/vehicle-selection";

@Component({
  selector: 'app-root',
  imports: [VehicleSelection],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SignalInAction');
}
