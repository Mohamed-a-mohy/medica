import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
  constructor(){
  }
  arr=[]
  private cartCounterBehavior = new BehaviorSubject([]) 
  cartCounter = this.cartCounterBehavior.asObservable()


  

  
}
