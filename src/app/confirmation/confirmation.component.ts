import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';



@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {
  //variables of data
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDate();
  //variables of cart
  totalPrice;
  productsInCart: [];
  orderedObject: {};
  //variables Of user
  userId;
  user;
  //variables of roshetta

  //variables of dataBase 
  currentOrderCollection: AngularFirestoreCollection;
  currentOrderObject: any =
    {
      orderId: 0,
      date: this.day + "/" + this.month + "/" + this.year,
      time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
      //user_details
      userId: "",
      userName: "",
      userPhone: "",
      userAddress: "",
      lag: 0,
      lat: 0,
      insuranceNum: 0,
      //order_details
      order: [],
      //roshetta_details
      roshetta: [],
    };
  scheduleOrdersCollection: AngularFirestoreCollection;
  scheduleOrdersObject = {
    orderId: 0,
    date: this.day + "/" + this.month + "/" + this.year,
    time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
    //user_details
    userId: "",
    userName: "",
    userPhone: "",
    userAddress: "",
    lag: 0,
    lat: 0,
    insuranceNum: 0,
    //order_details
    order: [],
    //roshetta_details
    roshetta: [],
    //schedule
    schedule: "",
  }
  usersOrderCollection: AngularFirestoreCollection;
  usersOrderObject = {
    orderId: 0,
    date: this.day + "/" + this.month + "/" + this.year,
    time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
    //user_details
    userId: "",
    userName: "",
    userPhone: "",
    userAddress: "",
    lag: 0,
    lat: 0,
    insuranceNum: 0,
    //order_details
    order: [],
    //roshetta_details
    roshetta: [],
    //order_status
    orderStatus: "",
  }
  //   function getRand(){
  //     return new Date().getTime().toString() + Math.floor(Math.random()*1000000);
  // }
  constructor(private serives: AddtocartService,
    private dataBase: AngularFireDatabase,
    private angularFS: AngularFirestore) { }

  ngOnInit() {
    this.serives.totalPriceObs.subscribe(price => {
      this.totalPrice = price
      console.log(this.totalPrice)
    })
    if (sessionStorage.getItem("cartView")) {
      this.productsInCart = JSON.parse(sessionStorage.getItem("cartView"))
    }
    if (localStorage.getItem("userId")) {
      this.userId = localStorage.getItem("userId")
    }
    this.user = this.angularFS.doc("users/" + this.userId).valueChanges()
    this.user.subscribe(item => {
      // checkInsurance: false
      // email: "eman@gmail.com"
      // password: "aA@12345"
      // role: "user"
      // userName: "eman"
      this.currentOrderObject.userId=this.scheduleOrdersObject.userId=this.usersOrderObject.userId=this.userId
      this.currentOrderObject.userName=this.scheduleOrdersObject.userName=this.usersOrderObject.userName=item.userName
      if(item.checkInsurance){
        
      }
    })



  }
}
