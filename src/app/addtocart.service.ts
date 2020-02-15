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
  removeFromCartLength(obj){
    let flag = false;
    let index;
    for(let i = this.counterArr.length - 1; i>=0; i--){
      if(obj.id == this.counterArr[i].id){
        flag = true;
        index = i;
      }
    }
    if(flag){
      this.counterArr.splice(index,1);
      this.CounterBehavior.next(this.counterArr.length);
    }
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
        obj.quantity++;
        this.cartArr.push(obj);
      }
      //if the arry not exist push 1st item in it 
    }else{
      obj.quantity++;
      this.cartArr.push(obj);
    }
    // update observable
    this.cartBehavior.next(this.cartArr);
   }

   decreaseViewCartItem(obj){
     //if to check if array exist
    if(this.cartArr[0]){
      let flag = false;
      let index;
      // search for item in the array
      for(let i = this.cartArr.length - 1 ; i>=0 ; i--){
        if(this.cartArr[i].id==obj.id){
          flag = true;
          index = i;
        }
      }
      if(flag){ // if the item exist in the array
        this.cartArr[index].quantity--;
        // update observable
       this.cartBehavior.next(this.cartArr);
      }
    }

   }
  

   // store data from databasse
   dbData = [];

   //itemObj which will be sent to product details page
   itemObj;

   // observable to track id changes in "product details" component and find the item that match this id
   private updateIdBehavior = new BehaviorSubject('');
   updateId = this.updateIdBehavior.asObservable();
   trackIdChanges(id){
     this.updateIdBehavior.next(id);
     if(this.dbData[0]){
       for(let i = 0; i<this.dbData.length; i++){
         if(this.dbData[i].id == id){
          this.itemObj = this.dbData[i];
         }
       }
     }
   }

   // cancel an item from cart
   cancelOrderFromCart(obj){
     // update array.length which use in cart counter
    let indexes = [];
    for(let i = this.counterArr.length - 1; i>=0 ; i--){
      if(obj.id == this.counterArr[i].id){
        indexes.push(i);
      }
    }
    for(let i = 0; i < indexes.length ; i++){
      let j = indexes[i];
      this.counterArr.splice(j,1);
    }
    this.CounterBehavior.next(this.counterArr.length);

    // update the item quantity in the arr of items in cart

    for(let i = 0; i < this.cartArr.length; i++){
      if(obj.id == this.cartArr[i].id){
        obj.quantity = 0;
        this.cartArr.splice(i,1);
      }
    }
    this.cartBehavior.next(this.cartArr);
   }
}
