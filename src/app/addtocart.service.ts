import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddtocartService {

  constructor() { }

  // the observable of array length
  // this array.length used in "cart" icon counter

  counterArr=[];
  private CounterBehavior = new BehaviorSubject(0);
  cartCounter = this.CounterBehavior.asObservable();
  viewCartLength(obj){
    // get the array length to view in cart icon 
    this.counterArr.push(obj);
    this.CounterBehavior.next(this.counterArr.length);
  }

  // the observable of cart items
  // this array used in "cart view"

  cartArr=[];
  private cartBehavior = new BehaviorSubject([]);
  cartItems = this.cartBehavior.asObservable();
  viewCartItems(obj){
    //if to check if array exist
    if(this.cartArr[0]){
      let flag = false;
      let index;
      // search for item in the array
      for(let i = 0 ; i<this.cartArr.length ; i ++){
        if(this.cartArr[i].id==obj.id){
          flag = true;
          index = i;
        }
      }

      if(flag){ // if the item exist in the array
        this.cartArr[index].quantity++;
      }else{ // if the item not exist un the array
        obj.quantity = 1;
        this.cartArr.push(obj);
      }
      //if the arry not exist push 1st item in it 
    }else{
      obj.quantity = 1;
      this.cartArr.push(obj);
    }
    // update observable
    this.cartBehavior.next(this.cartArr);
   }
  

   // store data from databasse
   dbData = [];

   // observable to track id changes in "product details" component
   private updateIdBehavior = new BehaviorSubject('');
   updateId = this.updateIdBehavior.asObservable();
   trackIdChanges(id){
     this.updateIdBehavior.next(id);
   }
  
}
