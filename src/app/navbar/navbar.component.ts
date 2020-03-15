import { Component, OnInit } from '@angular/core';
import {AddtocartService} from "../addtocart.service";
import { LoginService} from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  // ----------------------------------------------------------
  // properties
  // ----------------------------------------------------------
  counter:Number = 0;
  login:boolean = false;

  constructor(private service :AddtocartService,
    private loginService: LoginService,
    private router: Router) {
     }

  ngOnInit() {
    // ----------------------------------------------------------
    // update cart counter
    // ----------------------------------------------------------
   this.service.cartCounter.subscribe(arrLength=>{
     this.counter=arrLength;
   });

    // ----------------------------------------------------------
    // show 'logout'icon or 'sign in' icon
    // ----------------------------------------------------------     
    this.loginService.checkLogin$.subscribe(state=>{
      if(state && localStorage.getItem("role") == 'user'){
        this.login = true;
      }else if(!state || localStorage.getItem("role") != 'user'){
        this.login = false;
      }
    })
  }

  // ----------------------------------------------------------
  // logout function
  // ----------------------------------------------------------
  onLogout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.loginService.checkLoginBehavior.next('logout');
    this.router.navigate(['/home']);
  }
}
