import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'profileimagename' })
export class ProfileImageNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value) {
      const tokens = value.split(' ');
      return `${tokens[0][0]}${tokens[1][0]}`;
    }

    return null;
  }
}
