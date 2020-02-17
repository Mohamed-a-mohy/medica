import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// route import
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AddtocartService {
  // Behavior properties

  // the observable of array length
  // this array.length used in "cart" icon counter
  private CounterBehavior;
  counterArr;
  cartCounter;

  // the observable of cart items
  // this array used in "cart view"
  private cartBehavior;
  cartArr;
  cartItems;

  // store data from databasse
  dbData = [];
  getDataBehavior;
  getData;

  //itemObj which will be sent to product details page
  id;
  itemObj;

  //track changes of url
  routeLink;

  constructor(private route: ActivatedRoute,
    private router: Router,
    location: Location) {
      // track changes of url
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.routeLink = location.path();
      } else {
        this.routeLink = 'Home'
      }
    });

    // save data of the cart in sessionStorage
     // the observable of array length
    // this array.length used in "cart" icon counter

    this.CounterBehavior = new BehaviorSubject(0);
      this.counterArr = [];
    this.cartCounter = this.CounterBehavior.asObservable();

    this.cartBehavior = new BehaviorSubject([]);
      this.cartArr = [];
    this.cartItems = this.cartBehavior.asObservable();


    // observable for get data from database 
    this.getDataBehavior = new BehaviorSubject([]);
    this.getData = this.getDataBehavior.asObservable();
  }

  viewCartLength(obj) {
    // get the array length to view in cart icon 
    this.counterArr.push(obj);
    this.CounterBehavior.next(this.counterArr.length);
  }

  removeFromCartLength(obj) {
    let flag = false;
    let index = []
    for (let i = this.counterArr.length - 1; i >= 0; i--) {
      if (obj.id == this.counterArr[i].id) {
        flag = true;
        index.push(i);
      }
    }
    let j = index[0];
    if (flag && this.routeLink.includes("product/") && this.counterArr[j].quantity > 0) {
      this.counterArr.splice(index, 1);
      this.CounterBehavior.next(this.counterArr.length);
      sessionStorage.setItem('allData', JSON.stringify(this.dbData));
    }else if(flag && this.routeLink.includes("shop") && this.counterArr[j].quantity > 1){
      this.counterArr.splice(index, 1);
      this.CounterBehavior.next(this.counterArr.length);
    }

  }

  viewCartItems(obj) {
    //if to check if array exist
    if (this.cartArr[0]) {
      let flag = false;
      let index;
      // search for item in the array
      for (let i = 0; i < this.cartArr.length; i++) {
        if (this.cartArr[i].id == obj.id) {
          flag = true;
          index = i;
        }
      }

      if (flag) { // if the item exist in the array
        this.cartArr[index].quantity++;
      } else { // if the item not exist un the array
        obj.quantity++;
        this.cartArr.push(obj);
      }
      //if the arry not exist push 1st item in it 
    } else {
      obj.quantity++;
      this.cartArr.push(obj);
    }
    // update observable
    this.getCartView(this.cartArr) // test
    this.cartBehavior.next(this.cartArr);
    sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));

  }

  decreaseViewCartItem(obj) {
    //if to check if array exist
    if (this.cartArr[0]) {
      let flag = false;
      let index;
      // search for item in the array
      for (let i = this.cartArr.length - 1; i >= 0; i--) {
        if (this.cartArr[i].id == obj.id) {
          flag = true;
          index = i;
        }
      }
        if(flag && this.routeLink.includes("shop") && this.cartArr[index].quantity > 1){
          this.cartArr[index].quantity--;
          // update observable
          this.getCartView(this.cartArr) // test
        this.cartBehavior.next(this.cartArr);
        sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
        }else if(flag && this.routeLink.includes("product/") && this.cartArr[index].quantity > 0){
          this.cartArr[index].quantity--;
          this.getCartView(this.cartArr) // test
          if(this.cartArr[index].quantity == 0){
            this.cartArr.splice(index, 1);
          }
          // update observable
        this.cartBehavior.next(this.cartArr);
        sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
        console.log(this.cartArr);
        
        
      }
    }

  }

  // observable to track id changes in "product details" component and find the item that match this id

  private updateIdBehavior = new BehaviorSubject('');
  updateId = this.updateIdBehavior.asObservable();
  trackIdChanges(id) {
    this.updateIdBehavior.next(id);
    this.id = id;
  }

  // cancel an item from cart
  cancelOrderFromCart(obj) {
    for (let i = 0; i < this.cartArr.length; i++) {
      if (obj.id == this.cartArr[i].id) {
        obj.quantity = 0;
        this.cartArr.splice(i, 1);
      }
    }
    this.getCartView(this.cartArr) // test
    this.cartBehavior.next(this.cartArr);
    sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));

  }


  //when data came function

  dataCame(arr){
    this.dbData = arr;
    this.getDataBehavior.next(arr);
    sessionStorage.setItem('allData', JSON.stringify(arr));
    console.log('dbdata now updated to: ', arr);
  }

  getCartView(arr){
    this.cartArr = arr;
    let count = 0;
    this.cartBehavior.next(this.cartArr);
    for(let i = 0; i<this.cartArr.length; i++){
      count += this.cartArr[i].quantity;
    }
    this.CounterBehavior.next(count);
    console.log(this.cartArr);
    console.log(count);
    
    
  }

}
