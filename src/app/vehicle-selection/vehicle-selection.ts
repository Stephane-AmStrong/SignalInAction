import { Component, inject } from '@angular/core';
import { VehiculeService } from '../vehicule-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-selection',
  imports: [FormsModule],
  templateUrl: './vehicle-selection.html',
  styles: ``,
})
export class VehicleSelection {
  private vehicleService = inject(VehiculeService);

  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
  quantity = this.vehicleService.quantity;
  total = this.vehicleService.total;
  color = this.vehicleService.color;
  isLoading = this.vehicleService.isLoading;
  errorMessage = this.vehicleService.errorMessage;
}
