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

  // observable for get data of products from database 
  dbData = [];
  getDataBehavior = new BehaviorSubject([]);
  getData = this.getDataBehavior.asObservable();
  
  //itemObj which will be sent to product details page
  id;
  itemObj;
  
  //track changes of url
  routeLink;


  // ----------------------------------------------------------------
  // observables of cart functionanilty
  // ----------------------------------------------------------------

  // ----------------- cart -----------------

  // the observable of counter in navbar
  private CounterBehavior = new BehaviorSubject(0);
  cartCounter = this.CounterBehavior.asObservable();

  // the observable of items in cart
  cartArr = [];
  private cartBehavior = new BehaviorSubject([]);
  cartItems = this.cartBehavior.asObservable();

  // the observable of total price in cart
  private totalPriceBehavior = new BehaviorSubject(0);
  totalPriceObs = this.totalPriceBehavior.asObservable();

  // ----------------- conflict -----------------

  // properties of conflict data
  confArr = [];

  // observable for get data of conflict from database
  private confBehavior = new BehaviorSubject([]);
  confObs = this.confBehavior.asObservable();

  // observable for confirm user about conflict
  private isConflictBehavior = new BehaviorSubject(false);
  isConflict = this.isConflictBehavior.asObservable();

  // if user decieded to add a kind of drug even if it conflict with others in the cart
  ignoreConflictArr = [];

  // send the current item to the warning component
  private warnningBehavior = new BehaviorSubject({quantity: 0});
  warnningUpdate = this.warnningBehavior.asObservable();

  // send the drugs names which conflict with current item to the warning component
  private drugsNamesBehavior = new BehaviorSubject('');
  drugsNamesUpdate = this.drugsNamesBehavior.asObservable();

  // ----------------- roshetta -----------------

  //roshetta obsarvables
  roshettaDetailsBehavior = new BehaviorSubject({});
  roshettaDetails = this.roshettaDetailsBehavior.asObservable();
  roshettaFlagBehavior = new BehaviorSubject(false);
  roshettaFlag = this.roshettaFlagBehavior.asObservable();

  // ----------------------------------------------------------------
  // constructor function
  // ----------------------------------------------------------------

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

    // if there is something in ignoreArr before refresh
    if(sessionStorage.getItem('ignoreArr')){
      this.ignoreConflictArr = JSON.parse(sessionStorage.getItem('ignoreArr'));
    }

    // if there is a roshetta uploaded before refresh
    if(sessionStorage.getItem('roshettaDetails')){
      this.roshettaDetailsBehavior.next(JSON.parse(sessionStorage.getItem('roshettaDetails')));
    }
  }

  // ----------------------------------------------------------------
  // functions of cart functionanilty
  // ----------------------------------------------------------------

  // function of 'add to card' and '+' buttons
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
        } else { // if the item not exist in the array
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

  // function of 'decrease (-)' button
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
        this.cartArr.splice(i, 1);
        obj.quantity = 0;
      }
    }
    this.getCartView(this.cartArr) // update cart counter in navbar
    this.cartBehavior.next(this.cartArr);
    sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
  }

  //function to update cart counter in navbar
  getCartView(arr) {

    // update cart view
    this.cartArr = arr;
    this.cartBehavior.next(this.cartArr);
    
    // update counter in navbar and total price in cart
    let count = 0;
    let TotalPrice = 0;
    for (let i = 0; i < this.cartArr.length; i++) {
      count += (this.cartArr[i].quantity);
      // TotalPrice += (this.cartArr[i].quantity * this.cartArr[i].price ).toFixed(3);
      TotalPrice += Math.round((this.cartArr[i].quantity * this.cartArr[i].price ) * 100) /100;
    }
    this.CounterBehavior.next(count);
    this.totalPriceBehavior.next(TotalPrice);
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

    // var to save drugs names in cart that conflict with this drug --> to show them in warnning 
    let names = []

    // if user decieded to add a kind of drug even if it conflict with others in the cart
    let isIgnored = this.isIgnored(obj);
    if (isIgnored == false) {
      // check if item exict in cart before --> if it exict that mean no conflict between it and itself!
      let isItemExistInCart = false;
      for(let i = 0; i < this.cartArr.length; i++){
       if(obj.id == this.cartArr[i].id){
        isItemExistInCart = true;
       }
      }
      if(isItemExistInCart == false){
      // check if there is any conflict
      for (let i = 0; i < this.cartArr.length; i++) {
        compare = this.cartArr[i].active;
        for (let j = 0; j < this.confArr.length; j++) {
          if (compare == this.confArr[j].name) {
            confObjInfo = this.confArr[j];
          }
        }
        if(confObjInfo){ // some active has no conlict data in database
          for (let k = 0; k < confObjInfo.interactWith.length; k++) {
            if (obj.active == confObjInfo.interactWith[k]) {
              flag = true; // there is a conflict
              names.push(this.cartArr[i].name); // name of drug which conflict with this clicked item
            }
          }
        }
      }
    }
  }
    if (flag) {
      this.warnningBehavior.next(obj);
      this.drugsNamesBehavior.next(names.join(' / ')); // send names seperated by ' / ';
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
    let isIgnored = false;
      if (this.ignoreConflictArr[0]) {
        for (let i = 0; i < this.ignoreConflictArr.length; i++) {
          if (obj.id == this.ignoreConflictArr[i].id) {
            isIgnored = true;
          }
        }
      }
    return isIgnored; // true if ignored and that mean don't complete check for conflict
  }

  // ----------------------------------------------------------------
  // functions of rosheta
  // ----------------------------------------------------------------

  //get roshettaaaaa data from session storage........
  setRoshettaDetails(obj){
    this.roshettaDetailsBehavior.next(obj);
  }
  formatRoshettaForm(flag){
    this.roshettaFlagBehavior.next(flag);
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
