import {AbstractControl, ValidationErrors} from "@angular/forms";

export class DateValidator {

  static validateDate(start: string, end: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate1 = new Date(control.get(start)?.value).getTime()
      const endDate1 = new Date(control.get(end)?.value).getTime()
      if (startDate1 > endDate1) {
        return {validateDate: true}
      }
      return null
    }
  }
  static validateCurrentDate(control:AbstractControl):ValidationErrors|null{
    const dateCurrent=new Date().getTime()
    const date=new Date(control.value).getTime()
    if (date < dateCurrent){
      return {validateCurrentDate:true}
    }
    return null
  }
}
