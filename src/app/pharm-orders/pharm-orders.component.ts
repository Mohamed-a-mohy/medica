import { Component, OnInit } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';
// route import
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pharm-orders',
  templateUrl: './pharm-orders.component.html',
  styleUrls: ['./pharm-orders.component.scss']
})
export class PharmOrdersComponent implements OnInit {

  allOrders:Array<object>;
  routeLink: string;

  constructor(private pharmService: PharmServiceService,
    private router: Router,
    location: Location) { 
      // -----------------------------------------------
      // track changes of url and get data according to that
      // -----------------------------------------------
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.routeLink = location.path();
      }
      if(this.routeLink.includes('/pending')){
        this.pharmService.getPendingData();
        this.pharmService.commingOrdersObs.subscribe(items => {
          this.allOrders = items;
        });
        this.pharmService.showDetailsBehavoir.next(false);
      }else if(this.routeLink.includes('/inprogress')){
        this.pharmService.getInProgressPharmData();
        this.pharmService.commingOrdersObs.subscribe(items => {
          this.allOrders = items;
        });
        this.pharmService.showDetailsBehavoir.next(false);
      }else if(this.routeLink.includes('/orders')){
        this.pharmService.getCompletePharmData();
        this.pharmService.commingOrdersObs.subscribe(items => {
          this.allOrders = items;
        });
        this.pharmService.showDetailsBehavoir.next(false);
      }
    });
  }

  ngOnInit() {
  }

}
