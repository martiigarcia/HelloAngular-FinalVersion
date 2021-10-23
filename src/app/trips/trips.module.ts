import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripDetailComponent} from './trip-detail/trip-detail.component';
import {MaterialModule} from "../material/material.module";
import {TripsRoutingModule} from "./trips-routing.module";
import {TripListComponent} from './trip-list/trip-list.component';
import {TripAddPassengerComponent} from './trip-add-passenger/trip-add-passenger.component';
import { TripDeletePassengerComponent } from './trip-delete-passenger/trip-delete-passenger.component';
import {TripsService} from "./trips.service";


@NgModule({
  declarations: [
    TripDetailComponent,
    TripListComponent,
    TripAddPassengerComponent,
    TripDeletePassengerComponent
  ],
  imports: [
    CommonModule,
    TripsRoutingModule,
    MaterialModule
  ],
  providers: [TripsService],
})
export class TripsModule {
}
