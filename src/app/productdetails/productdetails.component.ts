import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  quantity;
  constructor() { }

  ngOnInit() {
    this.quantity = 2;

    
  }

  increment(){
      this.quantity++
  }

  decrement(){
    if(this.quantity > 0){
      this.quantity--;
    }
  }

}
