import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Brand} from "../domain/brand";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private resourceUrl: string = environment.backendUrl + "brand";

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.resourceUrl)
      .pipe(map(brands =>
        brands.map(brand => this.createBrand(brand)
        )));
  }

  private createBrand(information:any) : Brand{
   return new Brand(information.id, information.name, information.models);
  }

}
