import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';



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
  orderedProductObject={
    productName:"",
    productId:"",
    conc:"",
    type:"",
    schedule:"",
    price:"",
    quantity:"",
  };
  //variables Of user
  userId;
  user;
  //variables of roshetta
<<<<<<< HEAD
  roshettaNotes:string;
=======
  roshettaNotes;
>>>>>>> norhan
  cheskRoshetta:boolean;
  roshettaDetails:{};
  //variables of dataBase 
  currentOrderCollection: AngularFirestoreCollection;
  currentOrderObject: any =
    {
      orderId: 0,
      date: this.day + "/" + (this.month +1) + "/" + this.year,
      time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
      //user_details
      userId: "",
      userName: "",
      userPhone: "",
      userAddress: "",
      lng: 0,
      lat: 0,
      insuranceNum: 0,
      //order_details
      order: [],
      //roshetta_details
      roshetta:{},
    };
  scheduleOrdersCollection: AngularFirestoreCollection;
  scheduleOrdersObject = {
    orderId: 0,
    date: this.day + "/" + (this.month +1) + "/" + this.year,
    time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
    //user_details
    userId: "",
    userName: "",
    userPhone: "",
    userAddress: "",
    lng: 0,
    lat: 0,
    insuranceNum: 0,
    //order_details
    order: [],
    //roshetta_details
    roshetta:{},
    //schedule
    schedule: "",
  }
  usersOrderCollection: AngularFirestoreCollection;
  usersOrderObject = {
    orderId: 0,
    date: this.day + "/" + (this.month +1) + "/" + this.year,
    time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
    //user_details
    userId: "",
    userName: "",
    userPhone: "",
    userAddress: "",
    lng: 0,
    lat: 0,
    insuranceNum: 0,
    //order_details
    order: [],
    //roshetta_details
    roshetta:{},
    //order_status
    orderStatus: "",
  }
  roshettaImage: any;
  //   function getRand(){
  //     return new Date().getTime().toString() + Math.floor(Math.random()*1000000);
  // }
  constructor(private serives: AddtocartService,
              private dataBase: AngularFireDatabase,
              private angularFS: AngularFirestore,
              private router: Router) { }

  ngOnInit() {
    this.serives.totalPriceObs.subscribe(price => {
      this.totalPrice = price
      console.log(this.totalPrice)
    })
    if (sessionStorage.getItem("cartView")) {
      this.productsInCart = JSON.parse(sessionStorage.getItem("cartView"))
      for (let product of this.productsInCart) {
        this.orderedProductObject.productName=product.name
        this.orderedProductObject.productId=product.id
        this.orderedProductObject.conc=product.conc
        this.orderedProductObject.type=product.type
        this.orderedProductObject.price=product.price
        this.orderedProductObject.quantity=product.quantity
        let copyOrderedProduct = JSON.parse(JSON.stringify(this.orderedProductObject))
        this.currentOrderObject.order.push(copyOrderedProduct)
      }
      this.scheduleOrdersObject.order=this.usersOrderObject.order=[...this.currentOrderObject.order]  
    }
    console.log(this.currentOrderObject.order)
    /////////////////
    if (localStorage.getItem("userId")) {
      this.userId = localStorage.getItem("userId")
    }
    this.user = this.angularFS.doc("users/" + this.userId).valueChanges()
    this.user.subscribe(item => {
      this.currentOrderObject.userId = this.scheduleOrdersObject.userId = this.usersOrderObject.userId = this.userId
      this.currentOrderObject.userName = this.scheduleOrdersObject.userName = this.usersOrderObject.userName = item.userName
      if (item.checkInsurance) {
        this.currentOrderObject.insuranceNum = this.scheduleOrdersObject.insuranceNum = this.usersOrderObject.insuranceNum = item.insuranceNum
      }
    })
    if(sessionStorage.getItem('roshettaDetails')){
        this.cheskRoshetta = true ;
        this.roshettaDetails=JSON.parse(sessionStorage.getItem('roshettaDetails')) 
        this.roshettaNotes=this.roshettaDetails.roshettaNotes
        this.roshettaImage=this.roshettaDetails.roshettaImage
        console.log(this.roshettaNotes);
    }
    //////add data
    this.currentOrderCollection=this.angularFS.collection('currentOrders');
    this.currentOrderCollection.add(this.currentOrderObject)
    this.scheduleOrdersCollection=this.angularFS.collection('scheduleOrders')
    this.scheduleOrdersCollection.add(this.scheduleOrdersObject)
    this.usersOrderCollection=this.angularFS.collection('userOrders')
    this.usersOrderCollection.add(this.usersOrderObject)
  }
  getRoshetta(){
    // roshetta
    this.router.navigate(["/roshetta"])
  }
}
   // roshettaImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAA"
      // roshettaNotes: "noranote"
      // roshettaSchedualCheck: true
      // roshettaSchedual: "month"
      // imageName: "delivery info – 2.png"
      /////////////////////////
    // active: "alteplase"
    // brand: "egyptian pharmaceutical trading company"
    // category: "medicine"
    // conc: "50MG"
    // desc: {do: "", dose: "", sideEffect: "", usage: ""}
    // discount: 0
    // img: ""
    // name: "activase"
    // price: 8100
    // subCat: "CVS medicines"
    // type: "vial"
    // id: "0iXqccimWEc35z42XPqE"
    // quantity: 1
    /////////////
      // checkInsurance: true
      // email: "norhanahmed@gmail.com"
      // image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAA"
      // insuranceNum: "12345"
      // password: "Norhan@12345"
      // role: "user"
      // userName: "nora"
      ///////////
   
      /////////////////
           // checkInsurance: false
      // email: "eman@gmail.com"
      // password: "aA@12345"
      // role: "user"
      // userName: "eman"
