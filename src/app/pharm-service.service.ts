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
  allOrders;

  // ----------------------------------------------------------------
  // behavoir subject and observables
  // ----------------------------------------------------------------

  commingOrdersBehavoir = new BehaviorSubject([]);
  commingOrdersObs = this.commingOrdersBehavoir.asObservable();

  orderDetailsBehavoir = new BehaviorSubject({});
  orderDetailsObs = this.orderDetailsBehavoir.asObservable();

  showDetailsBehavoir = new BehaviorSubject(false);
  showDetailsObs = this.showDetailsBehavoir.asObservable();

  logoutBehavoir = new BehaviorSubject(true);
  logoutObs = this.logoutBehavoir.asObservable();

  // ----------------------------------------------------------------

  constructor(private angularFS: AngularFirestore) {

    // ----------------------------------------------------------------
    // get orders data from firebase
    // ----------------------------------------------------------------     
    this.pendingData = this.angularFS.collection('sentOrders').valueChanges({ idField: 'id' });
    this.pharmData = this.angularFS.collection('pharmaciesOrders').valueChanges({ idField: 'id' });
    this.allOrders = this.angularFS.collection('userOrders').valueChanges({ idField: 'id' });
  }

  // ----------------------------------------------------------------
  // get orders data from firebase
  // ----------------------------------------------------------------

  getPendingData() {
    this.pendingData.subscribe(items => {
      this.commingOrdersBehavoir.next(items.filter(item => item.nearestPharmId == localStorage.getItem('userId')));
    })
  }

  getInProgressPharmData(){
    this.pharmData.subscribe(items => {
      this.commingOrdersBehavoir.next(items.filter(item => item.nearestPharmId == localStorage.getItem('userId') && item.status == 'onWay'));
    })
  }

  getCompletePharmData(){
    this.pharmData.subscribe(items => {
      this.commingOrdersBehavoir.next(items.filter(item => item.nearestPharmId == localStorage.getItem('userId') && item.status == 'delivered'));
    })
  }

  // ----------------------------------------------------------------
  // edit date and time format to match UI Design
  // ----------------------------------------------------------------

  editDateAndTimeFormat(obj:object){
    let date;
    let time;
    let months = {
      1: 'Jan',
      2: 'Feb',
      3: 'March',
      4: 'Apr',
      5: 'May',
      6: 'Jun',
      7: 'Jul',
      8: 'Aug',
      9: 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    }

    // know what month in characters
    let firstIndexOfSlash = obj['date'].indexOf('/');
    let lastIndexOfSlash = obj['date'].lastIndexOf('/');
    let monthInNums = obj['date'].slice(firstIndexOfSlash+1, lastIndexOfSlash);
    let monthInChars = months[monthInNums];
    if(monthInChars == undefined){
      let secondNumInMonth = monthInNums.slice(1);
      monthInChars = months[secondNumInMonth];
    }

    // set all date in 'date' variable
    let dayDate = obj['date'].slice(0, firstIndexOfSlash);
    date = `${dayDate} ${monthInChars}`;

    // cut seconds from time
    let firstIndexOfcolon = obj['time'].indexOf(':');
    let lastIndexOfcolon = obj['time'].lastIndexOf(':');
    if(firstIndexOfcolon != lastIndexOfcolon){
      time = obj['time'].slice(0, lastIndexOfcolon);
    }else {
      time = obj['time'];
    }

    //know if it 'am' or 'pm'
    let hour = parseInt(obj['time'].slice(0, firstIndexOfcolon));
    let min = obj['time'].slice(firstIndexOfcolon, lastIndexOfcolon);
    let amOrPm;

    if(hour - 12 > 0 || hour - 12 == 0){
      amOrPm = 'pm';
      hour -= 12;
    }else{
      amOrPm = 'am';
    }

    // return the date and time in one string
    return `${date}, ${hour}${min} ${amOrPm}`;
  }

}
