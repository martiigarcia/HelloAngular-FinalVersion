import {Model} from "./model";

export class Bus {
  id: number;
  licensePlate: string;
  model: Model;
  numberOfSeats: number;


  constructor(id: number, licensePlate: string, model: Model, numberOfSeats: number) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.model = model;
    this.numberOfSeats = numberOfSeats;
  }

  getId(): number {
    return this.id;
  }

  getLicensePlate(): string {
    return this.licensePlate;
  }

  showModel(): string {
    return (this.model.showNameModel());
  }

  getModel(): Model {
    return this.model;
  }

  getNumberOfSeats(): number {
    return this.numberOfSeats
  }

}
