import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'filter'
}) 
export class FilterPipe implements PipeTransform {

  transform(users: any[], criteria: string): any[] {
    if (!users) {
      return [];
    }
    if (!criteria) {
      return users;
    }
    return users.filter(user => {
      console.info(user);
      return user.name.toLowerCase().includes(criteria.toLowerCase());
    });
  }

}
