import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> mohamed


@Component({
  selector: 'app-summeryview',
  templateUrl: './summeryview.component.html',
  styleUrls: ['./summeryview.component.scss']
})
export class SummeryviewComponent implements OnInit {
  myForm: FormGroup;
  itemsInCart;
<<<<<<< HEAD
  waringMassege;
  address;
  phone;
  
  constructor(private service: AddtocartService,
              private fb: FormBuilder,
              private router: Router
=======

  constructor(private service: AddtocartService,
              private fb: FormBuilder,
>>>>>>> mohamed
    ) { }

  ngOnInit() {
    this.service.cartItems.subscribe(items => {
      this.itemsInCart = items;})
<<<<<<< HEAD
      this.myForm = this.fb.group(
        {
          phone: ["", [Validators.required,Validators.pattern(/^01[0-9]{9}$/)]],
          address:["",[Validators.required]]
        }
      );
  }
  checkUserHaveAccount(){
    if(this.myForm.invalid){
      this.waringMassege ="You should enter your data";
    }else{
      this.address=document.getElementById("address").value
      this.phone=document.getElementById("phone").value
      sessionStorage.setItem("address_user",this.address)
      sessionStorage.setItem("phone_user",this.phone)

      if(localStorage.getItem('checkLogin')){
        this.router.navigate(["/confirm"])
      }else{
        this.router.navigate(["/sigIn"])
      }
    }
  }
  checkValidation(e, myForm){
    if(myForm.valid){
      document.getElementById("submit-btn").setAttribute("style","opacity:1")
    }else{
      document.getElementById("submit-btn").setAttribute("style","opacity:0.5")
    }
=======



      this.myForm = this.fb.group(
        {
          phone: ["", [Validators.required,  Validators.pattern(/^[0-9\w]{11,}$/)]],
          address:["",[Validators.required]]
        }
        
      );

>>>>>>> mohamed
  }
}