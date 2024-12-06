import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], key: string, order: 'asc' | 'desc' = 'asc'):any[] {
    if (!array || !key) return array;

    return array.sort((a, b) => {
      const valueA = new Date(a[key]).getTime();
      const valueB = new Date(b[key]).getTime();

      return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }

}
