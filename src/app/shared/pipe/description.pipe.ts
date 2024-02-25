import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
  standalone: true,
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string, args: number): string {
    let dots = value.length < args ? '' : '...';

    return `${value.substring(0, args)} ${dots}`;
  }
}
