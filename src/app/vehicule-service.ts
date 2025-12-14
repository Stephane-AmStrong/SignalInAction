import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';
  private http = inject(HttpClient);

  selectedVehicle = signal<Vehicle | undefined>(undefined);
  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: (v)=> v ? 1 : 0
  });

  total = computed(() => (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity());
  color = computed(() => (this.total() > 50000 ? 'green' : 'blue'));

  // effect(console.log(selected))

  private vehiclesResource = rxResource({
    /*params: () => ({ search: this.searchTerm() }),*/
    stream: (/*{ params }*/) => this.http.get<VehicleResponse>(this.vehicleUrl).pipe(map((vr) => vr.results), delay(2000)),
    defaultValue: []
  });

  vehicles = computed(() => this.vehiclesResource.value() ?? []);
  isLoading = this.vehiclesResource.isLoading;
  loadingEff = effect(() => console.log('Loading indicator:', this.vehiclesResource.isLoading()))
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
