import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TripDetailComponent} from "./trip-detail/trip-detail.component";
import {TripListComponent} from "./trip-list/trip-list.component";
import {TripAddPassengerComponent} from "./trip-add-passenger/trip-add-passenger.component";
import {TripDeletePassengerComponent} from "./trip-delete-passenger/trip-delete-passenger.component";

const routes: Routes = [
  {path: 'list', component: TripListComponent},
  {path: 'detail', component: TripDetailComponent},
  {path: 'add', component: TripAddPassengerComponent},
  {path: 'delete', component: TripDeletePassengerComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule {
}
