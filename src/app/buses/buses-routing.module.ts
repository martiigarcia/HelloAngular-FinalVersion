import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusDetailComponent} from "./bus-detail/bus-detail.component";
import {BusListComponent} from "./bus-list/bus-list.component";

const routes: Routes = [
  {path: 'list', component: BusListComponent},
  {path: 'detail', component: BusDetailComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusesRoutingModule {
}
