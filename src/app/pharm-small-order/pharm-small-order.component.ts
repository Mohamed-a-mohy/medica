import { Component, OnInit, Input } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';

@Component({
  selector: 'app-pharm-small-order',
  templateUrl: './pharm-small-order.component.html',
  styleUrls: ['./pharm-small-order.component.scss']
})
export class PharmSmallOrderComponent implements OnInit {
  @Input() order;
  dateTimeStr;
  containerElem;
  activeElementsArr;
  constructor(private pharmService: PharmServiceService) { }

  ngOnInit() {
    this.dateTimeStr = this.pharmService.editDateAndTimeFormat(this.order);
    this.containerElem = document.getElementById(this.order.orderId);
    this.activeElementsArr = document.getElementsByClassName('active-order');
    if(this.activeElementsArr[0]){
      this.removeActiveClass()
    }
  }

  showOrderDetails(event,currentOrder){
    if(this.activeElementsArr[0]){
      this.removeActiveClass()
    }
    console.log(currentOrder)
    this.containerElem.classList.add('active-order')
    console.log(this.containerElem.className);
    this.pharmService.orderDetailsBehavoir.next(this.order);
    this.pharmService.showDetailsBehavoir.next(true);
  }

  removeActiveClass(){
    for(let i = 0; i<this.activeElementsArr.length; i++){
      this.activeElementsArr[i].classList.remove('active-order');
    }
  }

}
