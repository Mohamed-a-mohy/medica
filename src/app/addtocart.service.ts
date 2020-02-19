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

  // store data from databasse
  dbData = [];
  getDataBehavior;
  getData;
  
  //itemObj which will be sent to product details page
  id;
  itemObj;
  
  //track changes of url
  routeLink;

  // ----------------------------------------------------------------
  // properties of cart functionanilty
  // ----------------------------------------------------------------

  // the observable of counter in navbar
  private CounterBehavior;
  cartCounter;

  // the observable of items in cart
  private cartBehavior;
  cartArr;
  cartItems;

  // properties of conflict data
  confBehavior;
  confArr = [];
  confObs;
  isConflict;
  isConflictBehavior;

  // if user decieded to add a kind of drug even if it conflict with others in the cart
  ignoreConflictArr = [];

  // send the current item to the warning component
  warnningBehavior;
  warnningUpdate;


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

    // observable for get data of products from database 
    this.getDataBehavior = new BehaviorSubject([]);
    this.getData = this.getDataBehavior.asObservable();

    // ----------------------------------------------------------------
    // observables of cart functionanilty
    // ----------------------------------------------------------------

    // the observable of counter in navbar
    this.CounterBehavior = new BehaviorSubject(0);
    this.cartCounter = this.CounterBehavior.asObservable();

    // the observable of items in cart
    this.cartBehavior = new BehaviorSubject([]);
    this.cartArr = [];
    this.cartItems = this.cartBehavior.asObservable();

    // observable for get data of conflict from database
    this.confBehavior = new BehaviorSubject([]);
    this.confObs = this.confBehavior.asObservable();

    // observable for confirm user about conflict
    this.isConflictBehavior = new BehaviorSubject(false);
    this.isConflict = this.isConflictBehavior.asObservable();

    // send the current item to the warning component
    this.warnningBehavior = new BehaviorSubject({});
    this.warnningUpdate = this.warnningBehavior.asObservable();


    // if there is something in ignoreArr before refresh
    if(sessionStorage.getItem('ignoreArr')){
      this.ignoreConflictArr = JSON.parse(sessionStorage.getItem('ignoreArr'));
    }
  }

  // ----------------------------------------------------------------
  // functions of cart functionanilty
  // ----------------------------------------------------------------

  // function of 'add to card' an '+' buttons
  viewCartItems(obj) {
    //if to check if array exist
    if (this.cartArr[0]) {
      // check if there is a conflict
      let completeAddTocartAction = this.chickIfConflict(obj); // true if there is no conflict or user ignore it
      if (completeAddTocartAction) {
        let flag = false; // to check if item is already on cart or no
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
      }
      //if the arry not exist push 1st item in it 
    } else {
      obj.quantity++;
      this.cartArr.push(obj);
    }
    this.getCartView(this.cartArr) // update cart counter in navbar
    this.cartBehavior.next(this.cartArr); // update observable
    sessionStorage.setItem('cartView', JSON.stringify(this.cartArr)); // update sesstion storage

  }

  // function of '-' button
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
      if (flag && this.routeLink.includes("shop") && this.cartArr[index].quantity > 1) {
        this.cartArr[index].quantity--;
        // update observable
        this.getCartView(this.cartArr) // update cart counter in navbar
        this.cartBehavior.next(this.cartArr);
        sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
      } else if (flag && this.routeLink.includes("product/") && this.cartArr[index].quantity > 0) {
        this.cartArr[index].quantity--;
        this.getCartView(this.cartArr) // update cart counter in navbar
        if (this.cartArr[index].quantity == 0) {
          this.cartArr.splice(index, 1);
        }
        // update observable
        this.cartBehavior.next(this.cartArr);
        sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
      }
    }

  }

  // function of 'cancel from cart (X)' button
  cancelOrderFromCart(obj) {
    for (let i = 0; i < this.cartArr.length; i++) {
      if (obj.id == this.cartArr[i].id) {
        obj.quantity = 0;
        this.cartArr.splice(i, 1);
      }
    }
    this.getCartView(this.cartArr) // update cart counter in navbar
    this.cartBehavior.next(this.cartArr);
    sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
  }

  //function to update cart counter in navbar
  getCartView(arr) {
    this.cartArr = arr;
    let count = 0;
    this.cartBehavior.next(this.cartArr);
    for (let i = 0; i < this.cartArr.length; i++) {
      count += this.cartArr[i].quantity;
    }
    this.CounterBehavior.next(count);
  }

  // ----------------------------------------------------------------
  // functions to check of conflict
  // ----------------------------------------------------------------

  // get conflict data from app component and set them in service
  getConflictData(arr) {
    this.confArr = arr;
    this.confBehavior.next(arr);
  }

  // function to check if a kind of drug conflict with others in cart
  chickIfConflict(obj) {
    let compare;
    let confObjInfo;
    let flag = false;

    // if user decieded to add a kind of drug even if it conflict with others in the cart
    let isIgnored = this.isIgnored(obj);
    if (isIgnored == false) {

      // check if there is any conflict
      for (let i = 0; i < this.cartArr.length; i++) {
        compare = this.cartArr[i].active;
        for (let j = 0; j < this.confArr.length; j++) {
          if (compare == this.confArr[j].name) {
            confObjInfo = this.confArr[j];
          }
        }
        for (let k = 0; k < confObjInfo.interactWith.length; k++) {
          if (obj.active == confObjInfo.interactWith[k]) {
            flag = true; // there is a conflict
            console.log('conflict')
          }
        }
      }
    }
    if (flag) {
      this.warnningBehavior.next(obj);
      this.isConflictBehavior.next(flag);
      // update warning observable
      return false; // if there is a conflict --> don't complete 'add to cart' function
    } else {
      this.isConflictBehavior.next(flag);
      return true; // if there is no conflict --> complete 'add to cart' function
    }
  }

  // if user decieded to add a kind of drug even if it conflict with others in the cart
  isIgnored(obj) {
    console.log(obj)
    let isIgnored = false;
    console.log(this.ignoreConflictArr.length)      
      if (this.ignoreConflictArr[0]) {
        console.log('inside if')
        for (let i = 0; i < this.ignoreConflictArr.length; i++) {
          console.log('inside for inside if')
          if (obj.id == this.ignoreConflictArr[i].id) {
            console.log('inside if inside for inside if')
            isIgnored = true;
          }
        }
      }
    console.log('isIgnored', isIgnored)
    return isIgnored; // true if ignored and that mean don't complete check for conflict
  }

  // ----------------------------------------------------------------
  // get all products data from app component and track id changes of product details
  // ----------------------------------------------------------------

  //when data came function
  dataCame(arr) {
    this.dbData = arr;
    this.getDataBehavior.next(arr);
    sessionStorage.setItem('allData', JSON.stringify(arr));
  }

    // observable to track id changes in "product details" component and find the item that match this id
    private updateIdBehavior = new BehaviorSubject('');
    updateId = this.updateIdBehavior.asObservable();
    trackIdChanges(id) {
      this.updateIdBehavior.next(id);
      this.id = id;
    }

}
