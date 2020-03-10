import { Component, OnInit } from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-cancel-warning',
  templateUrl: './cancel-warning.component.html',
  styleUrls: ['./cancel-warning.component.scss']
})
export class CancelWarningComponent implements OnInit {
  item:object;

  constructor(private service: AddtocartService) {
    this.service.cancelPopupObs.subscribe(obj => {
      this.item = obj;
    })
   }

  ngOnInit() {
  }

  cancelFromCart(){
    this.service.cancelOrderFromCart(this.item);
    this.service.cancelPopupBehavior.next({});
  }

}
