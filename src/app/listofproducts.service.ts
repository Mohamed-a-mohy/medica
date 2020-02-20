/* import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListofproductsService {
  private  navBehavior = new BehaviorSubject([]);
  nav = this.navBehavior.asObservable();
  changeQuantityCount(num){
    this.nav.next(num);
  }
  constructor() { }
}
 */