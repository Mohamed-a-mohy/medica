import { Component, OnInit, Input } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';

@Component({
  selector: 'app-pharm-small-order',
  templateUrl: './pharm-small-order.component.html',
  styleUrls: ['./pharm-small-order.component.scss']
})
export class PharmSmallOrderComponent implements OnInit {
  @Input() order:object;
  dateTimeStr:string;
  activeElementsArr:HTMLCollection;
  orderId:string = '';

  constructor(private pharmService: PharmServiceService) { }

  ngOnInit() {
    // ----------------------------------------------------------
    // edit date and time format to match the ui design
    // ----------------------------------------------------------
    this.dateTimeStr = this.pharmService.editDateAndTimeFormat(this.order);

    // ----------------------------------------------------------
    // catch all elements that have 'active-order' class and remove the class from them
    // ----------------------------------------------------------
    this.activeElementsArr = document.getElementsByClassName('active-order');
    if(this.activeElementsArr[0]){
      this.removeActiveClass();
    }

    // ----------------------------------------------------------
    // cut orderId to match the ui design
    // ----------------------------------------------------------
    if(this.order['orderId'].length >= 6){
      this.orderId = this.order['orderId'].substring(0, 5);
    }else if(this.order['orderId'].length < 6 && this.order['orderId'].length > 0){
      this.orderId = this.order['orderId'];
    }
  }

  // ----------------------------------------------------------
  // function to show order details component and add shadow to clicked small order component
  // ----------------------------------------------------------
  showOrderDetails(event){
    // first: shadow style of active order
    if(this.activeElementsArr[0]){
      this.removeActiveClass()
    }
    event.target.offsetParent.classList.add('active-order')

    // second: update observables to show order detailes
    this.pharmService.orderDetailsBehavoir.next(this.order);
    this.pharmService.showDetailsBehavoir.next(true);
  }

  // ----------------------------------------------------------
  // function to remove shadow style of all small orders
  // ----------------------------------------------------------
  removeActiveClass(){
    for(let i = 0; i<this.activeElementsArr.length; i++){
      this.activeElementsArr[i].classList.remove('active-order');
    }
  }

}
