import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../domain/user";

@Pipe({
  name: 'userShow'
})
export class UserShowPipe implements PipeTransform {

  transform(user: User | null): string {
    return user !== null ? user.getUsername() : '';
  }

}
