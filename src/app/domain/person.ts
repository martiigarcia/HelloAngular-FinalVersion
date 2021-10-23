export class Person {

  id: number;
  firstName: string;
  lastName: string;
  age: number;

  constructor(id: number, firstName: string, lastName: string, age: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  showName(): string {
    return this.firstName + " " + this.lastName;
  }
  getId():number{
    return this.id;
  }
  getFirstName():string{
    return this.firstName;
  }
  getLastName():string{
    return this.lastName;
  }
  getAge():number{
    return this.age;
  }

}
