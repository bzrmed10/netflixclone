import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value) return `https://image.tmdb.org/t/p/w500${value}`;
    else return '../../../../assets/img/noposter.jpg';
  }
}
