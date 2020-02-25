import { Component, OnInit, Input } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';

@Component({
  selector: 'app-pharm-small-order',
  templateUrl: './pharm-small-order.component.html',
  styleUrls: ['./pharm-small-order.component.scss']
})
export class PharmSmallOrderComponent implements OnInit {
  @Input() order;

  constructor(private pharmService: PharmServiceService) { }

  ngOnInit() {
  }

  showOrderDetails(){
    this.pharmService.orderDetailsBehavoir.next(this.order);
    this.pharmService.showDetailsBehavoir.next(true);
  }

}
