import { Component, OnInit } from '@angular/core';
import {AddtocartService} from "../addtocart.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  notification = 1;
  counter;
  constructor(private service :AddtocartService) { }

  ngOnInit() {
   this.service.cartCounter.subscribe(arrLength=>{
     this.counter=arrLength
   })
  }
}
