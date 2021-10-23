import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Bus} from "../domain/bus";
import {Model} from "../domain/model";
import {Brand} from "../domain/brand";

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  private resourceUrl: string = environment.backendUrl + "buses";

  constructor(private http: HttpClient) {
  }

  findOne(id: number): Observable<Bus> {
    return this.http.get<Bus>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("El colectivo seleccionado no existe.");
        }),
        map( bus => this.createBus(bus)
        ));
  }

  findAll(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.resourceUrl)
      .pipe(map(buses =>
        buses.map(bus => this.createBus(bus)
        )));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("El colectivo seleccionado no pudo ser eliminado.");
        }));
  }

  create(bus: Bus): Observable<any> {
    return this.http.post<any>(this.resourceUrl, bus).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("El colectivo no pudo ser registrado correctamente.");
      }));
  }

  update(bus: Bus): Observable<any> {
    return this.http.put<any>(this.resourceUrl, bus).pipe(
      catchError(error => {
        console.log("Error")
        return throwError("El colectivo no pudo ser actualizado correctamente.");
      }))
  }

  private createBus(information : any) : Bus{
    return new Bus(information.id, information.licensePlate,
      new Model(information.model.id, information.model.name,
        new Brand(information.model.brand.id, information.model.brand.name, information.model.brand.models)),
      information.numberOfSeats);
  }


}
