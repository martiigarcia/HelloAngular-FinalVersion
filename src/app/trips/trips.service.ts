import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Trip} from "../domain/trip";
import {Bus} from "../domain/bus";
import {Model} from "../domain/model";
import {Brand} from "../domain/brand";
import {Person} from "../domain/person";

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private resourceUrl: string = environment.backendUrl + "trips";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.resourceUrl)
      .pipe(map(trips =>
        trips.map((trip => this.createTrip(trip)
        ))));
  }

  findOne(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("No se encontro el viaje seleccionado.");
        }),
        map((trip => this.createTrip(trip)
        )));
  }

  create(trip: Trip): Observable<any> {
    console.log(trip)
    return this.http.post<any>(this.resourceUrl, trip).pipe(
      catchError(error => {
        return throwError("El viaje no pudo ser registrado correctamente.");
      }));
  }

  update(trip: Trip): Observable<any> {
    return this.http.put<any>(this.resourceUrl, trip).pipe(
      catchError(error => {
        return throwError("El viaje no pude ser actualizado correctamente.");
      }))
  }

  addPassengerToTrip(trip: Trip): Observable<any> {
    return this.http.put<any>(this.resourceUrl, trip).pipe(
      catchError(error => {
        return throwError("No se pudo agregar a la persona seleccionada al viaje.");
      }))
  }

  private createTrip(information: any): Trip {
    return (
      new Trip(information.id, information.departure, information.destination,
        new Bus(information.bus.id, information.bus.licensePlate,
          new Model(information.bus.model.id, information.bus.model.name,
            new Brand(information.bus.model.brand.id, information.bus.model.brand.name, information.bus.model.brand.models)),
          information.bus.numberOfSeats),
        information.passengers.map((p: { id: number; firstName: string; lastName: string; age: number; }) => new Person(p.id, p.firstName, p.lastName, p.age)),
        information.startDate, information.endDate));
  }

}
