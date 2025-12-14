import { HttpClient, HttpErrorResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';
import { setErrorMessage } from '../utilities/error-message';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

  private http = inject(HttpClient);

  selectedVehicle = signal<Vehicle | undefined>(undefined);
  selectedModel = signal<string>('');
  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: (v) => (v ? 1 : 0),
  });

  // Computed signals
  total = computed(() => (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity());
  color = computed(() => (this.total() > 50000 ? 'green' : 'blue'));


//   private vehiclesResource = rxResource({
//     /*params: () => ({ search: this.searchTerm() }),*/
//     stream: (/*{ params }*/) =>
//       this.http.get<VehicleResponse>(this.vehicleUrl).pipe(
//         map((vr) => vr.results)
//       ),
//     defaultValue: [],
//   });

    // private vehiclesResource = httpResource<VehicleResponse>(() => `${this.vehicleUrl}?search=${this.selectedModel()}`);

   // Using ** httpResource() ** with an object configuring a more complex request (HttpResourceRequest)
   private vehiclesResource = httpResource<VehicleResponse>(() => ({
      url: this.vehicleUrl,
      method: 'GET',
      headers: {
         accept: 'application/json'
      },
      params: {
         search: this.selectedModel(),
      },
   }));

  vehicles = computed(() => this.vehiclesResource.value() ?? []);
  isLoading = this.vehiclesResource.isLoading;
  error = computed(() => this.vehiclesResource.error() as HttpErrorResponse);
  errorMessage = computed(() => setErrorMessage(this.error(), 'Vehicle'));
  loadingEff = effect(() => console.log('Loading indicator:', this.vehiclesResource.isLoading()));
}

export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[];
}

export interface Vehicle {
  name: string;
  cost_in_credits: number;
}
