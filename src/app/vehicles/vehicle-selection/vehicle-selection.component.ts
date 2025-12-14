import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle.service';

@Component({
   selector: 'app-vehicle-selection',
   imports: [FormsModule],
   templateUrl: './vehicle-selection.component.html',
   styleUrl: './vehicle-selection.component.css'
})
export class VehicleSelectionComponent {
   pageTitle = "Select a Vehicle";

   // Injected services
   private vehicleService = inject(VehicleService);

   // Signals to support the template
   vehicles = this.vehicleService.vehicles;
   errorMessage = this.vehicleService.errorMessage;
   isLoading = this.vehicleService.isLoading;
   selectedVehicle = this.vehicleService.selectedVehicle;
   quantity = this.vehicleService.quantity;
   total = this.vehicleService.total;
   color = this.vehicleService.color;
}
