import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashedNumber',
})
export class DashedNumberPipe implements PipeTransform {
  transform(value: string): string {
    return value.match(/.{1,3}/g).join('-');
  }
}
