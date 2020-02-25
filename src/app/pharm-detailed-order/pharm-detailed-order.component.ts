import { Component, OnInit } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';
// firebase import
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pharm-detailed-order',
  templateUrl: './pharm-detailed-order.component.html',
  styleUrls: ['./pharm-detailed-order.component.scss']
})
export class PharmDetailedOrderComponent implements OnInit {
  order;
  addCollection;
  show;

  constructor(private pharmService: PharmServiceService,
     private angularFS: AngularFirestore) {
      this.addCollection = this.angularFS.collection('pharmaciesOrders');
      }

  ngOnInit() {
    this.pharmService.orderDetailsObs.subscribe(order => {
      this.order = order;
    })

    this.pharmService.showDetailsObs.subscribe(status => {
      this.show = status;
    })
  }

  acceptHandler(){
    this.order.status = 'onWay';
    this.deleteItem("sentOrders", this.order.id);
    this.addItem(this.order);
    this.pharmService.showDetailsBehavoir.next(false);
  }

  confirmHandler(){
    this.order.status = 'delivered';
    this.updateItem('pharmaciesOrders', this.order.id, this.order);
    this.pharmService.showDetailsBehavoir.next(false);
  }

  declineHandler(){
    this.order.nearestPharmId = '';
    this.updateItem('sentOrders', this.order.id, this.order);
    this.pharmService.showDetailsBehavoir.next(false);
  }

  // firebase function

  deleteItem(collection, id){
    let itemDoc = this.angularFS.doc(collection + '/' + id);
    itemDoc.delete();
  }

  addItem(itemToadd){
    this.addCollection.add(itemToadd)
  }

  updateItem(collection, id, order){
    let itemDoc = this.angularFS.doc(collection + '/' + id);
    itemDoc.update(order);
  }

}
