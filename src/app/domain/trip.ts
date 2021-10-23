import {Bus} from "./bus";
import {Person} from "./person";

export class Trip {

  id: number;
  departure: string;
  destination: string;
  bus: Bus;
  passengers: Person[];
  startDate: number;
  endDate: number;


  constructor(id: number, departure: string, destination: string, bus: Bus, passengers: Person[], startDate: number, endDate: number) {
    this.id = id;
    this.departure = departure;
    this.destination = destination;
    this.bus = bus;
    this.passengers = passengers;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getId():number{
    return this.id;
  }

  getDeparture():string{
    return this.departure;
  }

  getDestination():string{
    return this.destination;
  }

  getStartDate():number{
    return this.startDate;
  }

  getEndDate():number{
    return this.endDate;
  }

  getBus():Bus{
    return this.bus;
  }

  getPassengers():Person[]{
    return this.passengers;
  }

  setPassengers(passegers: Person[]){
    this.passengers=passegers;
  }

  showName(): string {
    return this.departure;
  }

  showBus(): string {
    return this.bus.getLicensePlate();
  }

  showPassengers(): string {
    let cadena = "";
    this.passengers.forEach(p => cadena = cadena + p.showName() + "; " + "\n");
    return cadena;
  }

  //valida si la cantidad de pasajeros del viaje es menor a la cantidad de asientos del colectivo asignado
  validateAvailableSeatasForPassengers(): boolean {
    let e = false;
    if (this.passengers.length < this.bus.getNumberOfSeats()) {
      e = true;

      //si es menor retorna true
      //si es mayor retorna false
    }
    return e;
  }

  //retorna la cantidad e lugares restantes en el colectivo
  getAvailableSeats(): number {
    return this.bus.getNumberOfSeats() - this.passengers.length;
  }

  //valida si la lista de pasajeros esta vacia o no
  validateEmptyPassengersToDelete():boolean{
    let e = false;
    if(this.passengers.length!==0){
      e = true;
    }
    return e;
  }

}
