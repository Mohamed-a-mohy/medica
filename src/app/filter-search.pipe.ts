import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {
  transform(products: any, searchTerm: any): any {
    if(!products || !searchTerm){
      return products
    }
    return products.filter(element=>{
       let idElement = element.id
     return element.name.toUpperCase().indexOf(searchTerm.toUpperCase()) == 0
    })

  }
}
