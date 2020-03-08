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
  lngLat_user=[];
  //variables of roshetta
  roshettaNotes:string;
  cheskRoshetta:boolean;
  roshettaDetails:{};
  //variables of dataBase 
  currentOrderCollection: AngularFirestoreCollection;
  currentOrderObject: any =
    {
      orderId: new Date().getTime().toString() + Math.floor(Math.random()*1000000),
      date: this.day + "/" + (this.month +1) + "/" + this.year,
      time: this.now.getHours() + ":" + this.now.getMinutes() + ":" + this.now.getSeconds(),
      nearestPharmId: 'mGl6vFOdgbxGq3NLUqiS',
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
      roshetta:{
        image:"",
        note:""
      },
    };
  scheduleOrdersCollection: AngularFirestoreCollection;
  scheduleOrdersObject = {
    orderId: new Date().getTime().toString() + Math.floor(Math.random()*1000000),
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
    roshetta:{
      image:"",
      note:""
    },
    //schedule
    schedule: "",
  }
  usersOrderCollection: AngularFirestoreCollection;
  usersOrderObject = {
    orderId: new Date().getTime().toString() + Math.floor(Math.random()*1000000),
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
    roshetta:{
      image:"",
      note:""
    },
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
        this.orderedProductObject.productName=product["name"]
        this.orderedProductObject.productId=product["id"]
        this.orderedProductObject.conc=product["conc"]
        this.orderedProductObject.type=product["type"]
        this.orderedProductObject.price=product["price"]
        this.orderedProductObject.quantity=product["quantity"] 
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
      this.currentOrderObject.userName = this.scheduleOrdersObject.userName = this.usersOrderObject.userName = item["userName"]
      if (item.checkInsurance) {
        this.currentOrderObject.insuranceNum = this.scheduleOrdersObject.insuranceNum = this.usersOrderObject.insuranceNum = item.insuranceNum
      }
    })
    if(sessionStorage.getItem('roshettaDetails')){
        this.cheskRoshetta = true ;
        this.roshettaDetails=JSON.parse(sessionStorage.getItem('roshettaDetails')) 
        this.roshettaNotes=this.roshettaDetails["roshettaNotes"]
        this.roshettaImage=this.roshettaDetails["roshettaImage"]
        this.currentOrderObject.roshetta.image=this.scheduleOrdersObject.roshetta.image=this.usersOrderObject.roshetta.image=this.roshettaDetails["roshettaImage"]
        this.currentOrderObject.roshetta.note=this.scheduleOrdersObject.roshetta.note=this.usersOrderObject.roshetta.note=this.roshettaDetails["roshettaNotes"]
    }
  if(sessionStorage.getItem('phone_user')){
      this.currentOrderObject.userPhone=this.scheduleOrdersObject.userPhone=this.usersOrderObject.userPhone=sessionStorage.getItem('phone_user')
  }
  if(sessionStorage.getItem('address_user')){
     this.currentOrderObject.userAddress=this.scheduleOrdersObject.userAddress=this.usersOrderObject.userAddress=sessionStorage.getItem('address_user')
  }
  if(sessionStorage.getItem('lngLat_user')){
    this.lngLat_user=JSON.parse(sessionStorage.getItem('lngLat_user')) 
    this.currentOrderObject.lat=this.scheduleOrdersObject.lat=this.usersOrderObject.lat=this.lngLat_user[1]
    this.currentOrderObject.lng=this.scheduleOrdersObject.lng=this.usersOrderObject.lng=this.lngLat_user[0]
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
