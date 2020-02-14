import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  // in case of product details page
  private quantityBehavior = new BehaviorSubject(0);
  quantityCounter = this.quantityBehavior.asObservable();
  changeQuantityCount(num){
    this.quantityBehavior.next(num);
  }


  constructor() { }
}
