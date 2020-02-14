import { Component, OnInit, Input } from '@angular/core';
import { QuantityService } from '../quantity.service';


@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  quantity;
  constructor(private quantityService: QuantityService) {}
  ngOnInit() {
    this.quantityService.quantityCounter.subscribe(count=>{
      this.quantity = count;
    })
  }


/*   addToCart(){
    this.service.viewCartLength(this.item)
    this.service.viewCartItems(this.item)

  } */

  /* increment(){
    this.quantity++
  }

  decrement(){
  if(this.quantity > 0){
    this.quantity--;
    }
  } */

}
