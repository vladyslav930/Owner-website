import { Pipe, PipeTransform } from '@angular/core';
import { MyndPhoneNumberPipe } from '@myndmanagement/common';

@Pipe({
  name: 'oPhoneNumber',
})
export class PhoneNumberV2Pipe implements PipeTransform {

  constructor(private phoneNumberPipe: MyndPhoneNumberPipe) { }

  transform(value: string|number): string {
    const sections = this.phoneNumberPipe.transform(value).split(' ');
    return sections.length === 2 ? `${sections[0].slice(1, 4)}-${sections[1]}` : '';
  }
}
