import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  quantity;
  collapse1;
  collapse2;
  collapse3;
  collapse4;
  constructor() { }

  ngOnInit() {
    this.quantity = 2;
    this.collapse1=document.getElementById("collapse1")
    this.collapse2=document.getElementById("collapse2")
    this.collapse3=document.getElementById("collapse3")
    this.collapse4=document.getElementById("collapse4")
    console.log(this.collapse1);

    
  }

  increment(){
      this.quantity++
  }

  decrement(){
    if(this.quantity > 0){
      this.quantity--;
    }
  }

  checkcolps(){
   if(this.collapse1.className=="show"){
      this.collapse2.classList.remove("show");
      this.collapse3.classList.remove("show");
      this.collapse4.classList.remove("show");
      
    }
    /*   className.replace(" active", "") */
    console.log("hi");
    
  }
}

