import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmServiceService {

  // ----------------------------------------------------------------
  // get orders data from firebase
  // ----------------------------------------------------------------
  pendingData;
  pharmData;
  // orders;

  commingOrdersBehavoir = new BehaviorSubject([]);
  commingOrdersObs = this.commingOrdersBehavoir.asObservable();

  orderDetailsBehavoir = new BehaviorSubject({});
  orderDetailsObs = this.orderDetailsBehavoir.asObservable();

  showDetailsBehavoir = new BehaviorSubject(false);
  showDetailsObs = this.showDetailsBehavoir.asObservable();

  constructor(private angularFS: AngularFirestore) {

    // ----------------------------------------------------------------
    // get orders data from firebase
    // ----------------------------------------------------------------     
    this.pendingData = this.angularFS.collection('sentOrders').valueChanges({ idField: 'id' });
    this.pharmData = this.angularFS.collection('pharmaciesOrders').valueChanges({ idField: 'id' });
  }

  // ----------------------------------------------------------------
  // get orders data from firebase
  // ----------------------------------------------------------------

  getPendingData() {
    this.pendingData.subscribe(items => {
      // this.orders = items;
      this.commingOrdersBehavoir.next(items.filter(item => item.nearestPharmId == localStorage.getItem('userId')));
    })
  }

  getInProgressPharmData(){
    this.pharmData.subscribe(items => {
      // this.orders = items;
      this.commingOrdersBehavoir.next(items.filter(item => item.nearestPharmId == localStorage.getItem('userId') && item.status == 'onWay'));
    })
  }

  getCompletePharmData(){
    this.pharmData.subscribe(items => {
      // this.orders = items;
      this.commingOrdersBehavoir.next(items.filter(item => item.nearestPharmId == localStorage.getItem('userId') && item.status == 'delivered'));
    })
  }

}
