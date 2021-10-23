import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Model} from "../domain/model";
import {Brand} from "../domain/brand";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private resourceUrl: string = environment.backendUrl + "model";

  constructor(private http: HttpClient) {
  }

  findAllById(id: number): Observable<Model[]> {
    return this.http.get<Model[]>(this.resourceUrl + "/" + id)
      .pipe(
        catchError(error => {
          return throwError("No se encontró el modelo seleccionado.");
        }),
        map(models =>
          models.map(model => this.createModel(model))
        ));
  }

  private createModel(information:any):Model{
    return new Model(information.id, information.name,
      ((information.brand !== null)
        ?
        new Brand(information.brand.id, information.brand.name, information.brand.models)
        :
        new Brand(0, "", [""]))

      //uso un operador ternario porque como el valor que devuelve es un null,
      // hace que falle al momento de cargar los dato del select html
    );
  }

}
