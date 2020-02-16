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
    if (!sessionStorage.getItem('counterArray')) {
      // sessionStorage.setItem('counterArray', '[]');
      this.CounterBehavior = new BehaviorSubject(0);
      this.counterArr = [];
    }else {
      // this.counterArr = JSON.parse(sessionStorage.getItem('counterArray'));
      // this.CounterBehavior = new BehaviorSubject(this.counterArr.length);
    }
    this.cartCounter = this.CounterBehavior.asObservable();

    // the observable of cart items
    // this array used in "cart view"
    if (!sessionStorage.getItem('cartView')) {
      // sessionStorage.setItem('cartView', '[]');
      this.cartBehavior = new BehaviorSubject([]);
      this.cartArr = [];
    }else {
      // this.cartBehavior = new BehaviorSubject(JSON.parse(sessionStorage.getItem('cartView')));
      // this.cartArr = JSON.parse(sessionStorage.getItem('cartView'));
      // console.log('this.cartArr', this.cartArr)
    }
    this.cartItems = this.cartBehavior.asObservable();


    // observable for get data from database 
    this.getDataBehavior = new BehaviorSubject([]);
    this.getData = this.getDataBehavior.asObservable();
    this.itemObj 
  }

  viewCartLength(obj) {
    // get the array length to view in cart icon 
    this.counterArr.push(obj);
    this.CounterBehavior.next(this.counterArr.length);
    // sessionStorage.setItem('counterArray', JSON.stringify(this.counterArr));
  }

  removeFromCartLength(obj) {
    let flag = false;
    let index;
    for (let i = this.counterArr.length - 1; i >= 0; i--) {
      if (obj.id == this.counterArr[i].id) {
        flag = true;
        index = i;
      }
    }
    if (flag && this.routeLink.includes("product/") && this.cartArr[index].quantity > 0) {
      this.counterArr.splice(index, 1);
      this.CounterBehavior.next(this.counterArr.length);
      // sessionStorage.setItem('counterArray', JSON.stringify(this.counterArr));
    }else if(flag && this.routeLink.includes("shop") && this.cartArr[index].quantity > 1){
      this.counterArr.splice(index, 1);
      this.CounterBehavior.next(this.counterArr.length);
      // sessionStorage.setItem('counterArray', JSON.stringify(this.counterArr));
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
    this.cartBehavior.next(this.cartArr);
    // sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
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
        }else if(flag && this.routeLink.includes("product/") && this.cartArr[index].quantity > 0){
          this.cartArr[index].quantity--;
          if(this.cartArr[index].quantity == 0){
            this.cartArr.splice(index, 1);
          }
        }
        // update observable
        this.cartBehavior.next(this.cartArr);
        // sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
    }

  }

  // observable to track id changes in "product details" component and find the item that match this id

  /* private */ 
  
  
  updateIdBehavior = new BehaviorSubject('');
  updateId = this.updateIdBehavior.asObservable();
  trackIdChanges(id) {
    
    this.updateIdBehavior.next(id);
    this.id = id;
    console.log(this.dbData);
      // if (this.dbData[0]) {
      //   for (let i = 0; i < this.dbData.length; i++) {
      //     if (this.dbData[i].id == id) {
      //       this.itemObj = this.dbData[i];
      //     }
      //   }
      //   console.log("inside the if od this.dbData[0]")
      // }
    console.log("dpData ",this.dbData,"updatedID" ,this.updateId,"itemobj" , this.itemObj);
    
  }

  // cancel an item from cart
  cancelOrderFromCart(obj) {
    // update array.length which use in cart counter
    let indexes = [];
    for (let i = this.counterArr.length - 1; i >= 0; i--) {
      if (obj.id == this.counterArr[i].id) {
        indexes.push(i);
      }
    }
    for (let i = 0; i < indexes.length; i++) {
      let j = indexes[i];
      this.counterArr.splice(j, 1);
    }
    this.CounterBehavior.next(this.counterArr.length);
    // sessionStorage.setItem('counterArray', JSON.stringify(this.counterArr));

    // update the item quantity in the arr of items in cart

    for (let i = 0; i < this.cartArr.length; i++) {
      if (obj.id == this.cartArr[i].id) {
        obj.quantity = 0;
        this.cartArr.splice(i, 1);
      }
    }
    this.cartBehavior.next(this.cartArr);
    // sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
  }


  //when data came function

  dataCame(arr){
    this.getDataBehavior.next(arr);
    
    console.log(arr)
    console.log(this.itemObj)
  }
}
