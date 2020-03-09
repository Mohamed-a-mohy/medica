import { Component, OnInit } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';
// firebase import
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// report form
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-pharm-detailed-order',
  templateUrl: './pharm-detailed-order.component.html',
  styleUrls: ['./pharm-detailed-order.component.scss']
})
export class PharmDetailedOrderComponent implements OnInit {
  order:object;
  addCollection;
  show:boolean;
  dateTimeStr:string;
  orderId:string = '';
  report:string = '';

  // report form
  reportForm: FormGroup;
  reportMsgTextArea;
  noReasonError:boolean = false;

  // all orders data
  userOrderInuserOrders:object;

  constructor(private pharmService: PharmServiceService,
     private angularFS: AngularFirestore) {
  }

  ngOnInit() {

    // ----------------------------------------------------
    // report form validation
    // ----------------------------------------------------
    this.reportForm = new FormGroup({
      reportMsg:new FormControl('', [Validators.required, Validators.pattern(/[A-z]{10,}/)])
    });
    this.reportMsgTextArea = document.getElementById('reportMsgTextArea');

    // ----------------------------------------------------
    // order detailes data
    // ----------------------------------------------------
    this.pharmService.orderDetailsObs.subscribe(order => {
      this.order = order;
      if(this.order['time']){
        this.dateTimeStr = this.pharmService.editDateAndTimeFormat(this.order);
      }
      if(this.order['orderId']){
        if(this.order['orderId'].length >= 6){
          this.orderId = this.order['orderId'].substring(0, 5);
        }else if(this.order['orderId'].length < 6 && this.order['orderId'].length > 0){
          this.orderId = this.order['orderId'];
        }
      }
    })

    // ----------------------------------------------------
    // show - hide detailes component
    // ----------------------------------------------------
    this.pharmService.showDetailsObs.subscribe(status => {
      this.show = status;
    })

    // ----------------------------------------------------
    // order from all orders data (userOrders collection)
    // ----------------------------------------------------

    this.pharmService.allOrders.subscribe(items => {
      this.userOrderInuserOrders = items.filter(item => item.orderId == this.order['orderId'])[0];
    })
  }

  // ----------------------------------------------------
  // report form submit functions
  // ----------------------------------------------------

  removeErrorMsg(){
    this.noReasonError = false;
  }

  assignTextToVar(e){
    if(this.reportForm.valid){
      this.report = this.reportForm.value.reportMsg;

      // add report property
      this.reportHandler(this.order); 
      this.reportHandler(this.userOrderInuserOrders);

      // delete from sentOrders and add to reportedOrders and update it in usersOrders
      this.deleteItem("sentOrders", this.order['id']);
      this.addItem(this.order, 'reportedOrders');
      this.updateItem('userOrders', this.userOrderInuserOrders['id'], this.userOrderInuserOrders);

      // empty textarea and form object and close the popup
      this.resetValues();
      e.target.setAttribute('data-dismiss',"modal");
      
    }else{
      this.noReasonError = true;
    }
  }

  resetValues(){
    this.reportMsgTextArea.value = '';
    this.reportForm.value.reportMsg = '';
  }
  
  // ----------------------------------------------------
  // pharmacy actions
  // ----------------------------------------------------

  acceptHandler(){
    this.order['status'] = 'onWay';
    this.deleteItem("currentOrders", this.order['id']);
    this.addItem(this.order, 'pharmaciesOrders');
    this.pharmService.showDetailsBehavoir.next(false);
  }

  confirmHandler(){
    this.order['status'] = 'delivered';
    this.updateItem('pharmaciesOrders', this.order['id'], this.order);
    this.pharmService.showDetailsBehavoir.next(false);
  }

  declineHandler(){
    this.order['nearestPharmId'] = '';
    this.deleteItem("sentOrders", this.order['id']);
    this.addItem(this.order, 'currentOrders');
    this.pharmService.showDetailsBehavoir.next(false);
  }

  reportHandler(obj:object){
    obj['report'] = this.report;
    obj['nearestPharmId'] = '';
    this.pharmService.showDetailsBehavoir.next(false);
  }

  // ----------------------------------------------------
  // firebase function
  // ----------------------------------------------------

  deleteItem(collection:string, id:string){
    let itemDoc = this.angularFS.doc(collection + '/' + id);
    itemDoc.delete();
  }

  addItem(itemToadd:object, collectionName:string){
    this.addCollection = this.angularFS.collection(collectionName);
    this.addCollection.add(itemToadd);
  }

  updateItem(collection:string, id:string, order:object){
    let itemDoc = this.angularFS.doc(collection + '/' + id);
    itemDoc.update(order);
  }

}
