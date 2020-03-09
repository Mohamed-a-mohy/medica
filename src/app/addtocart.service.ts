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
  dbData: Array<object> = [];
  getDataBehavior = new BehaviorSubject([]);
  getData = this.getDataBehavior.asObservable();

  //itemObj which will be sent to product details page
  id: string;
  itemObj;

  //track changes of url
  routeLink: string;


  // ----------------------------------------------------------------
  // observables of cart functionanilty
  // ----------------------------------------------------------------

  // ----------------- cart -----------------

  // the observable of counter in navbar
  private CounterBehavior = new BehaviorSubject(0);
  cartCounter = this.CounterBehavior.asObservable();

  // the observable of items in cart
  cartArr: Array<object> = [];
  private cartBehavior = new BehaviorSubject([]);
  cartItems = this.cartBehavior.asObservable();

  // the observable of total price in cart
  private totalPriceBehavior = new BehaviorSubject(0);
  totalPriceObs = this.totalPriceBehavior.asObservable();

  // ----------------- conflict -----------------

  // properties of conflict data
  confArr: Array<object> = [];

  // observable for get data of conflict from database
  private confBehavior = new BehaviorSubject([]);
  confObs = this.confBehavior.asObservable();

  // observable for confirm user about conflict
  private isConflictBehavior = new BehaviorSubject(false);
  isConflict = this.isConflictBehavior.asObservable();

  // if user decieded to add a kind of drug even if it conflict with others in the cart
  ignoreConflictArr: Array<object> = [];

  // send the current item to the warning component
  private warnningBehavior = new BehaviorSubject({});
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
      }
    });

    // if there is something in ignoreArr before refresh
    if (sessionStorage.getItem('ignoreArr')) {
      this.ignoreConflictArr = JSON.parse(sessionStorage.getItem('ignoreArr'));
    }

    // if there is a roshetta uploaded before refresh
    this.roshettaDetailsBehavior.next(JSON.parse(sessionStorage.getItem('roshettaDetails')));
  }

  // ----------------------------------------------------------------
  // functions of cart functionanilty
  // ----------------------------------------------------------------

  // --------------- function of 'add to card' and '+' buttons ---------------
  addToCart(obj: object) {
    sessionStorage.removeItem('checkedOut');
    if (this.cartArr[0]) { //if to check if array not empty
      if (this.chickIfConflict(obj)) { // true if there is no conflict or user ignore it
        let index: number;
        this.cartArr.filter((item: object, i: number) => { if (item['id'] == obj['id']) { index = i } });
        if (index >= 0) { // if the item exist in the array
          this.cartArr[index]['quantity']++;
        } else { // if the item not exist in the array
          obj['quantity']++;
          this.cartArr.push(obj);
        }
      }
    } else { //if the arry empty push 1st item in it
      obj['quantity']++;
      this.cartArr.push(obj);
    }
    this.updateCartCounterAndObsAndStorage();
  }

  // --------------- function of 'decrease (-)' button ---------------
  decreaseQuantity(obj: object) {
    if (this.cartArr[0]) { //if to check if array exist
      let index: number;
      this.cartArr.filter((item: object, i: number) => { if (item['id'] == obj['id']) { index = i } });
      if (index >= 0 && (this.routeLink.includes("shop") || this.routeLink.includes("order-summery")) && this.cartArr[index]['quantity'] > 1) {
        this.cartArr[index]['quantity']--;
        this.updateCartCounterAndObsAndStorage();
      } else if (index >= 0 && this.routeLink.includes("product/") && this.cartArr[index]['quantity'] > 0) {
        this.cartArr[index]['quantity']--;
        if (this.cartArr[index]['quantity'] == 0) {
          this.cartArr.splice(index, 1);
        }
        this.updateCartCounterAndObsAndStorage();
      }
    }
  }

  // --------------- function of 'cancel from cart (X)' button ---------------
  cancelOrderFromCart(obj: object) {
    this.cartArr = this.cartArr.filter((item: object) => item['id'] != obj['id']);
    obj['quantity'] = 0;
    this.updateCartCounterAndObsAndStorage();
  }

  // --------------- function to empty cart after checkout ---------------
  emptyCart() {
    if (this.cartArr[0]) {
      for (let i = 0; i < this.cartArr.length; i++) {
        this.cartArr[i]['quantity'] = 0;
      }
      this.cartArr = []; // empty the cart
      this.updateCartCounterAndTotalPrice(this.cartArr) // update cart counter in navbar
      this.cartBehavior.next(this.cartArr);
      sessionStorage.setItem('checkedOut', "true");
    }
  }

  // --------------- function to update cart counter in navbar ---------------
  updateCartCounterAndTotalPrice(arr: Array<object>) {
    // update cart view
    // important if user refresh the page then data will came from sesstionStorage in app componant
    this.cartArr = arr;
    this.cartBehavior.next(this.cartArr);
    // update Cart Counter And Total Price
    let count = 0;
    let TotalPrice = 0;
    for (let i = 0; i < this.cartArr.length; i++) {
      count += (this.cartArr[i]['quantity']);
      TotalPrice += Math.round((this.cartArr[i]['quantity'] * this.cartArr[i]['price']) * 100) / 100;
    }
    this.CounterBehavior.next(count);
    this.totalPriceBehavior.next(TotalPrice);
  }

  // --------------- update cart counter in navbar and observable and sesstion storage ---------------
  updateCartCounterAndObsAndStorage() {
    this.updateCartCounterAndTotalPrice(this.cartArr);
    this.cartBehavior.next(this.cartArr);
    sessionStorage.setItem('cartView', JSON.stringify(this.cartArr));
  }

  // ----------------------------------------------------------------
  // functions to check of conflict
  // ----------------------------------------------------------------

  // --------------- get conflict data from app component and set them in service ---------------
  getConflictData(arr: Array<object>) {
    this.confArr = arr;
    this.confBehavior.next(arr);
  }

  // --------------- function to check if a kind of drug conflict with others in cart ---------------
  chickIfConflict(obj: object) {
    let confObjInfo: object;
    let names: Array<string> = [];
    // if user decieded to add a kind of drug even if it conflict with others in the cart
    if (this.isIgnored(obj) < 1) {
      // check if item exict in cart before --> if it exict that mean no conflict between it and itself!
      let isItemExistInCart: Array<object> = this.cartArr.filter(item => item['id'] == obj['id']);
      if (isItemExistInCart.length < 1) {
        // check if there is any conflict
        for (let i = 0; i < this.cartArr.length; i++) {
          confObjInfo = this.confArr.filter(item => this.cartArr[i]['active'] == item['name'])[0];
          if (confObjInfo) { // some ['active'] has no conlict data in database
            confObjInfo['interactWith'].forEach(item => { if (item == obj['active']){ names.push(this.cartArr[i]['name'])}});
          }
        }
      }
    }
    if (names.length) {
      this.warnningBehavior.next(obj);
      this.drugsNamesBehavior.next(names.join(' / ')); // send names seperated by ' / ';
      this.isConflictBehavior.next(true); // update warning observable
      return false; // if there is a conflict --> don't complete 'add to cart' function
    } else {
      this.isConflictBehavior.next(false); // update warning observable
      return true; // if there is no conflict --> complete 'add to cart' function
    }
  }
  
  // --------------- if user decieded to add a kind of drug even if it conflict with others in the cart ---------------
  isIgnored(obj: object): number {
    let isIgnored: Array<object> = [];
    isIgnored = this.ignoreConflictArr.filter(item => item['id'] == obj['id']);
    console.log(isIgnored.length);
    return isIgnored.length; // true (1) if ignored and that mean don't complete check for conflict
  }

  // ----------------------------------------------------------------
  // functions of rosheta
  // ----------------------------------------------------------------

  //get roshettaaaaa data from session storage........
  setRoshettaDetails(obj) {
    this.roshettaDetailsBehavior.next(obj);
  }
  formatRoshettaForm(flag) {
    this.roshettaFlagBehavior.next(flag);
  }

  // ----------------------------------------------------------------
  // get all products data from app component and track id changes of product details
  // ----------------------------------------------------------------

  //when data came function
  dataCame(arr: Array<object>) {
    this.dbData = arr;
    this.getDataBehavior.next(arr);
    sessionStorage.setItem('allData', JSON.stringify(arr));
  }

  // observable to track id changes in "product details" component and find the item that match this id
  private updateIdBehavior = new BehaviorSubject('');
  updateId = this.updateIdBehavior.asObservable();

  trackIdChanges(id: string) {
    this.updateIdBehavior.next(id);
    this['id'] = id;
  }
}
