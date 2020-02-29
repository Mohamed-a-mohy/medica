import { Component, OnInit ,Input} from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-item-small',
  templateUrl: './item-small.component.html',
  styleUrls: ['./item-small.component.scss']
})
export class ItemSmallComponent implements OnInit {
  @Input()item;
  itemsInCart
  constructor(private service :AddtocartService) { }

  ngOnInit() {
<<<<<<< HEAD
  //   this.service.cartItems.subscribe(items => {
  //     this.itemsInCart = items;})
=======
    this.service.cartItems.subscribe(items => {
      this.itemsInCart = items;})
>>>>>>> mohamed
  }

}
