import { Component, OnInit } from '@angular/core';
import { AddtocartService } from './addtocart.service';


// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//endhere

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medica';
  itemCollection;
  arrOfItems;
  items;

  conflict;
  confCollection;
  conflictArr;

  constructor(db: AngularFireDatabase,
    private angularFS: AngularFirestore,
    private service: AddtocartService) {
    // get data from database
    this.items = this.angularFS.collection('products').valueChanges({ idField: 'id' });
    this.itemCollection = this.angularFS.collection('products');

    this.getItems().subscribe(items => {
      // check sesttion storage
      if (sessionStorage.getItem('allData')) { // if data already exist
        // send data to service and store it in behavour subject
        this.arrOfItems = JSON.parse(sessionStorage.getItem('allData'));
        this.service.dataCame(this.arrOfItems);
      }else{ // if data not exist

        /* 1- add quantity proparty to each item = 0;
        2- send data to service and store it in behavour subject */
        this.arrOfItems = this.addQuantityProp(items);
        this.service.dataCame(this.arrOfItems);
      }

      if (!sessionStorage.getItem('cartView')) {
        sessionStorage.setItem('cartView', '[]');
      } else {
        this.service.getCartView(JSON.parse(sessionStorage.getItem('cartView')));
      }
    })

    // get data of conflict from database
    this.conflict = this.angularFS.collection('interactions').valueChanges({ idField: 'id' });
    this.confCollection = this.angularFS.collection('interactions');
    this.getConfliict().subscribe(items => {
      this.conflictArr = items;
      this.service.getConflictData(items);
    });
  }
  ngOnInit() {
   }

  getItems() {
    return this.items;
  }

  getConfliict() {
    return this.conflict;
  }

  addQuantityProp(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].quantity = 0;
    }
    return arr;
  }
}