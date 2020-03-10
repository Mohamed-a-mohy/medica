import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-item',
  templateUrl: './confirm-item.component.html',
  styleUrls: ['./confirm-item.component.scss']
})
export class ConfirmItemComponent implements OnInit {
  @Input() item:object;
  itemName:string;
  constructor() { }

  ngOnInit() {
    if(this.item['productName']){
      this.itemName = this.item['productName'];
    }else if(this.item['name']){
      this.itemName = this.item['name'];
    }
  }

}
