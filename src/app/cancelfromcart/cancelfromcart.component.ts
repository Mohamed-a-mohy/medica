import { Component, OnInit, Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-cancelfromcart',
  templateUrl: './cancelfromcart.component.html',
  styleUrls: ['./cancelfromcart.component.scss']
})
export class CancelfromcartComponent implements OnInit {
  @Input() item;
  constructor(private service: AddtocartService) { }

  ngOnInit() {
  }

  sendItemToCancelPopup(){
    this.service.cancelPopupBehavior.next(this.item);
  }

}
