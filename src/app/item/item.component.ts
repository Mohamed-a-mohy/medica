import { Component, OnInit,Input } from '@angular/core';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
@Input()item
  constructor(private service: AddtocartService) { }

  ngOnInit() {
  }

  // click on a link
  handleGetUrl(e){
    console.log('hi, you clicked on an ancore');
    this.service.geturl();
  }

}
