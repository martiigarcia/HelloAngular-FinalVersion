import {Brand} from "./brand";

export class Model {

  id: number;
  name: string;
  brand: Brand;


  constructor(id: number, name: string, brand: Brand) {
    this.id = id;
    this.name = name;
    this.brand = brand;
  }

  showName(): string {
    return this.name;
  }

  showNameModel(): string {
    return this.name + ', ' + this.brand.showName();
  }

  getBrand(): Brand {
    return this.brand;
  }

  getId(): number{
    return this.id;
  }

}
