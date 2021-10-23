import {Injectable} from '@angular/core';
import {Person} from "../domain/person";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class PersonService {

  private resourceUrl: string = environment.backendUrl + "persons";

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.resourceUrl)
      .pipe(map(persons =>
        persons.map(person => this.createPerson(person)
        )));
  }

  findOne(id: number): Observable<Person> {
    return this.http.get<Person>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("No se encontro la persona seleccionada.");
        }),
        map(person => this.createPerson(person)
        ));
  }

  create(person: Person): Observable<any> {
    return this.http.post<any>(this.resourceUrl, person).pipe(
      catchError(error => {
        return throwError("La persona no se pudo registrar correctamente.");
      }));
  }

  update(person: Person): Observable<any> {
    return this.http.put<any>(this.resourceUrl, person).pipe(
      catchError(error => {
        return throwError("La persona no se pudo actualizar correctamente.");
      }))
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("La persona no pudo ser eliminada.");
        }));
  }

  private createPerson(information:any):Person{
    return new Person(information.id, information.firstName, information.lastName, information.age);
  }
}
