import {Component} from '@angular/core';
import {Person} from "../../domain/person";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../person/person.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectionModel} from '@angular/cdk/collections';
import {Trip} from "../../domain/trip";
import {TripsService} from "../trips.service";

@Component({
  selector: 'app-trip-add-passenger',
  templateUrl: './trip-add-passenger.component.html',
  styleUrls: ['./trip-add-passenger.component.css']
})

export class TripAddPassengerComponent {

  persons: Person[] = [];
  passengers: Person[] = [];
  personsAvailable: Person[] = [];
  personsArray: Person[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['select', 'id', 'name', 'age'];
  selection = new SelectionModel<Person>(true, []);
  trip: Trip | undefined;


  constructor(public route: ActivatedRoute, public router: Router,
              private personService: PersonService,
              private tripService: TripsService,
              private snackBar: MatSnackBar,) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      let paramId = param.get("id");
      if (paramId != null) {
        const id = parseInt(paramId);
        this.tripService.findOne(id).subscribe(
          trip => {
            this.trip = trip;

            this.personService.findAll().subscribe( persons => {
                this.personsAvailable = persons.filter(person => {
                  let is = true;
                  trip.getPassengers().forEach(passenger => {
                    if (passenger.getId() === person.getId()) {
                      is = false;
                    }
                  });
                  return is;
                });
              });

            },
          error => {
            this.snackBar.open(error, "Error", {duration: 2000});
            this.goToBack();
            }
        );
      }
    });
  }

  goToBack() {
    this.router.navigate(['trips', 'list']);
  }

  update(selection: SelectionModel<Person>) {

    if (this.trip) {
      if (!selection.isEmpty()) {

        this.personsArray = selection.selected;

        if (this.personsArray.length <= this.trip?.getAvailableSeats()) {

          this.personsArray.forEach(p => {

            this.trip?.passengers.push(p);

          });

          this.tripService.update(this.trip).subscribe(t => {
              this.snackBar.open("El pasajero se agrego con exito", "Éxito", {duration: 2000});
              this.goToBack();
            },
            error => {
              this.snackBar.open(error, "Error", {duration: 2000});
            });

        } else {
          this.snackBar.open("La cantidad de personas seleccionadas excede el limite.", "Error", {duration: 2000});
        }
      } else {
        this.snackBar.open("No se selecciono ninguna persona de la lista.", "Error", {duration: 2000});
      }
    }
  }


}
