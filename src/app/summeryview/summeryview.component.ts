import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
import { UserLocationService } from '../user-location.service';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-summeryview',
  templateUrl: './summeryview.component.html',
  styleUrls: ['./summeryview.component.scss']
})
export class SummeryviewComponent implements OnInit {
  myForm: FormGroup;
  itemsInCart;
  totalItem;
  waringMassege;

  address;
  phone;
  city;
  neighborhood;

  located = false;
  displayMap = false;
  notLocated;
  ordersDiv;
  cheskRoshetta: boolean;
  
  constructor(private service: AddtocartService,
              private locService: UserLocationService,
              private fb: FormBuilder,
              private router: Router
    ) { }

  ngOnInit() {
    this.service.cartItems.subscribe(items => {
      this.itemsInCart = items;
      this.totalItem =0
      for (let item of this.itemsInCart){
        this.totalItem=this.totalItem+item.quantity
      }}
      )
      if(sessionStorage.getItem('roshettaDetails')){
        this.cheskRoshetta = true ;
      }
      this.myForm = this.fb.group(
        {
          phone: ["", [Validators.required,Validators.pattern(/^01[0-9]{9}$/)]],
          address:["",[Validators.required]],
          neighborhood: ["", [Validators.required]],
          city: ["Alexandria", [Validators.required]]
        }
      );
      
      // get some html elemnts by id
      this.address = document.getElementById("address");
      this.phone = document.getElementById("phone");
      this.city = document.getElementById("city");
      this.neighborhood = document.getElementById("neighborhood");

      this.ordersDiv = document.getElementById('orders');

      // obsarvables of location
        // 1- observable of coordinatesArr --> if array not empty then user choose his location
        this.locService.coordinatesArrObs.subscribe(arr => {
          if(arr[0]){
            this.located = true;
          }else {
            this.located = false;
          }
          this.checkValidation('', this.myForm);
        })
  }
  onSubmit(){
    if(this.myForm.invalid){
      this.waringMassege ="You should enter your data";
    }else if(this.located == false){ // display error msg on html
      this.waringMassege = '';
      this.notLocated = true;
    }else{ // all valid

      // store user data in session
      let address = `${this.address.value}, ${this.neighborhood.value}, ${this.city.value}`;
      let phone = this.phone.value;
      sessionStorage.setItem("address_user", address)
      sessionStorage.setItem("phone_user", phone)
      sessionStorage.setItem("lngLat_user", JSON.stringify(this.locService.coordinatesArr));
      this.service.emptyCart();
      sessionStorage.setItem('buy', 'true');
      this.router.navigate(["/confirm"])
    }
  }

  // change confirm btn opacity
  checkValidation(e, myForm){
    if(myForm.valid && this.located){
      document.getElementById("submit-btn").setAttribute("style","opacity:1")
    }else{
      document.getElementById("submit-btn").setAttribute("style","opacity:0.5")
    }
  }

  // -------------------------------------------------
  // locations functions
  // -------------------------------------------------
  getCurrentPosition(){
    this.displayMap = false;
    this.notLocated = false;
    this.ordersDiv.className = 'ordersMinHight';
    this.locService.getUserCurrentLocation();
  }

  getLocationOnMap(){
    this.displayMap = true;
    this.notLocated = false;
    this.locService.coordinatesArr = [];
    this.locService.coordinatesArrBehavior.next([]);

    this.ordersDiv.className = 'orders';
    let address = `${this.neighborhood.value}, ${this.city.value}`;
    this.locService.searchWordBehavior.next(address);
  }
}