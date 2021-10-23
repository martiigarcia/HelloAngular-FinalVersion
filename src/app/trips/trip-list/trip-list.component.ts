import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Trip} from "../../domain/trip";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {TripsService} from "../trips.service";
import {Bus} from "../../domain/bus";
import {Person} from "../../domain/person";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trip: Trip | undefined;
  displayedColumns: string[] = ['id', 'departure', 'destination', 'capacity', 'bus', 'passengers', 'startDate', 'endDate', 'option'];
  trips: Trip[] = [];
  buses: Bus[] = [];
  passengers: Person[] = [];
  loading: boolean = false;

  constructor(public router: Router,
              private tripService: TripsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.tripService.findAll().subscribe(list => {
      this.trips = list;
      this.loading = false;
    });
  }

  goToDetail(t: Trip | null) {
    if (t == null)
      this.router.navigate(['trips', 'detail']);
    else
      this.router.navigate(['trips', 'detail', {id: t.getId()}]);
  }

  addPassenger(id: number) { //le paso el id de un viaje
    this.tripService.findOne(id).subscribe(trip => {
      if (trip != null) {
        this.trip = trip;
        this.loading = false;

        if (this.trip?.validateAvailableSeatasForPassengers()) {
          this.router.navigate(['trips', 'add', {id}]);
        } else {
          this.snackBar.open("No hay mas capacidad de pasajeros para el viaje seleccionado.", "Error", {duration: 2000});
        }
      }
    });
  };

  deletePassenger(id: number) { //le paso el id de un viaje
    this.tripService.findOne(id).subscribe(trip => {
      if (trip != null) {
        this.trip = trip;
        this.loading = false;

        if (this.trip?.validateEmptyPassengersToDelete()) {
          this.router.navigate(['trips', 'delete', {id}]);
        } else {
          this.snackBar.open("No hay mas capacidad de pasajeros para el viaje seleccionado.", "Error", {duration: 2000});
        }
      }
    });
  }

}


