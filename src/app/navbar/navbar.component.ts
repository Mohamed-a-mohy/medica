import { Component, OnInit, } from '@angular/core';
import {AddtocartService} from "../addtocart.service";
import { LoginService} from '../login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  notification = 1;
  counter;
  checkuserLogin


  /////test1
listOfProducts;


  constructor(private service :AddtocartService,
    private loginService: LoginService) { 
      this.service.getData.subscribe(items => {
        this.listOfProducts = items
        this.categoryClicker(items)
      });
    }

  ngOnInit() {
   this.service.cartCounter.subscribe(arrLength=>{
     this.counter=arrLength;
   })

   this.loginService.checkLogin$.subscribe(checkLogin => {
    this.checkuserLogin = checkLogin;
  })
  }

  logout(){
    localStorage.removeItem('checkLogin')
    this.loginService.changeLoginStatus(localStorage.getItem('checkLogin'))
    localStorage.removeItem('userId')
    this.loginService.changeLoginStatus(localStorage.getItem('userId'))
  }
  

  //test1
  categoryClicker(arr){
    this.listOfProducts = arr
  }
  
}
