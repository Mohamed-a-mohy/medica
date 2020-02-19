import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import {AddtocartService} from "../addtocart.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  notification = 1;
  counter;

  arrOfData=[]
  @Output() callFunc = new EventEmitter()
  
  constructor(private service :AddtocartService) { }

  ngOnInit() {
   this.service.cartCounter.subscribe(arrLength=>{
     this.counter=arrLength
   })


  }
  getListOfProducts(){
    this.callFunc.emit("done")
  }


  firstComponentFunction(){    
    this.service.onFirstComponentButtonClick();    
  }    

}
  
 
