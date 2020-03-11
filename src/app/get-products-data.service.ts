import { Injectable } from '@angular/core';
import { AddtocartService } from './addtocart.service';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
//endhere

@Injectable({
  providedIn: 'root'
})
export class GetProductsDataService {
  items;
  conflict;
  arrOfItems: Array<object>;

  // ------------------------------------------------------
  // observables
  // ------------------------------------------------------
  productsDataBehavior = new BehaviorSubject([]);
  productDataObs = this.productsDataBehavior.asObservable();
  conflictDataBehavior = new BehaviorSubject([]);
  conflictDataObs = this.conflictDataBehavior.asObservable();

  constructor(db: AngularFireDatabase,
    private angularFS: AngularFirestore,
    private service: AddtocartService) {

    // ------------------------------------------------------
    // get data from database
    // ------------------------------------------------------
    this.items = this.angularFS.collection('products').valueChanges({ idField: 'id' });
    this.items.subscribe(items => {

      // check sesttion storage
      if (sessionStorage.getItem('allData')) { // if data already exist
        // send data to service and store it in behavour subject
        this.service.dataCame(JSON.parse(sessionStorage.getItem('allData')));
        this.productsDataBehavior.next(JSON.parse(sessionStorage.getItem('allData')));
      } else { // if data not exist

        /* 1- add quantity proparty to each item = 0;
        2- send data to service and store it in behavour subject */
        this.arrOfItems = this.addQuantityProp(items);
        this.service.dataCame(this.arrOfItems);
        this.productsDataBehavior.next(this.arrOfItems);
      }

      // ------------------------------------------------------
      // update cart array
      // ------------------------------------------------------
      if (!sessionStorage.getItem('cartView') || sessionStorage.getItem('checkedOut')) {
        sessionStorage.setItem('cartView', '[]');
      } else {
        this.service.updateCartCounterAndTotalPrice(JSON.parse(sessionStorage.getItem('cartView')));
      }
    })

    // ------------------------------------------------------
    // get data of conflict from database
    // ------------------------------------------------------
    this.conflict = this.angularFS.collection('interactions').valueChanges({ idField: 'id' });
    this.conflict.subscribe(items => {
      this.service.getConflictData(items);
      this.conflictDataBehavior.next(items);
    });
  }

  // ------------------------------------------------------
  // add quantity property + add to cart property to all items
  // ------------------------------------------------------
  addQuantityProp(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].quantity = 0;
      arr[i].addToCart = 'add to cart';
    }
    return arr;
  }
}
