import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusDetailComponent} from './bus-detail/bus-detail.component';
import {BusesRoutingModule} from "./buses-routing.module";
import {MaterialModule} from "../material/material.module";
import {BusListComponent} from './bus-list/bus-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "../dialog/dialog.module";
import {BusesService} from "./buses.service";


@NgModule({
  declarations: [
    BusDetailComponent,
    BusListComponent
  ],
  imports: [
    CommonModule,
    BusesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogModule,
  ],
  providers: [BusesService]
})
export class BusesModule {
}
