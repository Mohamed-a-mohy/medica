import { Component, OnInit,Input } from '@angular/core';
import { AddtocartService } from "../addtocart.service"
@Component({
  selector: 'app-btntocart',
  templateUrl: './btntocart.component.html',
  styleUrls: ['./btntocart.component.scss']
})
export class BtntocartComponent implements OnInit {
@Input() item;
show;

  constructor(private service :AddtocartService) { 
    this.service.isConflict.subscribe(showStatus=>{
      this.show= showStatus;
    });
  }

  ngOnInit() {
  }

  addToCart(){
    this.service.viewCartItems(this.item);
  }

}
