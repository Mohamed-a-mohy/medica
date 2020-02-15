import { Component, OnInit,Input } from '@angular/core';
import { AddtocartService } from "../addtocart.service"
@Component({
  selector: 'app-btntocart',
  templateUrl: './btntocart.component.html',
  styleUrls: ['./btntocart.component.scss']
})
export class BtntocartComponent implements OnInit {
@Input() item;
  constructor(private service :AddtocartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.service.viewCartLength(this.item)
    this.service.viewCartItems(this.item)
  }

}
