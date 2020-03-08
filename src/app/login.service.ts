import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from "angularfire2/firestore";
import { Router,  NavigationEnd } from '@angular/router';
import { parse } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users;
  pharmacies;
  checkLoginBehavior = new BehaviorSubject(false);
  checkLogin$ = this.checkLoginBehavior.asObservable();
  userIdBehavior = new BehaviorSubject('');
  userId$ = this.userIdBehavior.asObservable();
  previousUrl: string;
  currentUrl: string;

  constructor(
    private angularFS: AngularFirestore,
    private router: Router) { 
    this.users = this.angularFS.collection("users").valueChanges({idField:'id'});
    this.changeLoginStatus(localStorage.getItem('role')); // show 'logout'icon or 'sign in' icon in navbar
    this.users.subscribe(items => {
      this.users = items;
    });
    this.pharmacies = this.angularFS.collection("pharmacies").valueChanges({idField:'id'});
    this.pharmacies.subscribe(items => {
      this.pharmacies = items;
    });
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  getPreviousUrl() {
    return this.previousUrl;
  } 

  checkValidUser(form): void {
    if(form.value.pharmacyCheck){
      for (let pharmacy of this.pharmacies) {
        if (
          pharmacy["email"] == form.value.email &&
          pharmacy["password"] == form.value.password
        ) {
         /*  localStorage.setItem("checkLogin", "true");
          this.changeLoginStatus(localStorage.getItem("checkLogin")); */
          localStorage.setItem('userId', pharmacy.id);
          this.addUserId(localStorage.getItem('userId'));
          localStorage.setItem('role', pharmacy['role']);
          
          return;
        }
      }
    } else{
      for (let user of this.users) {
        if (
          user["email"] == form.value.email &&
          user["password"] == form.value.password
        ) {
          /* localStorage.setItem("checkLogin", "true");
          this.changeLoginStatus(localStorage.getItem("checkLogin")); */
          localStorage.setItem('userId', user.id);
          this.addUserId(localStorage.getItem('userId'));
          localStorage.setItem('role', user['role']);
          if(sessionStorage.getItem('checkOutPath')){
            this.router.navigate([sessionStorage.getItem('checkOutPath')]);
          } else{
            this.router.navigate(['/home']);
          }
          return;
        }
      }
    }
    
    document.getElementsByClassName("mesError")[1].innerHTML = "";
    document.getElementsByClassName("mesError")[0].innerHTML =
      "*Email or password is invalid";
  }
  
  addUserId(id){
    this.userIdBehavior.next(id);
  }

  // ----------------------------------------------------------
  // show 'logout'icon or 'sign in' icon in navbar
  // ---------------------------------------------------------- 
  changeLoginStatus(userstatus){
    if(userstatus == 'user'){
      this.checkLoginBehavior.next(true);
    }else{
      this.checkLoginBehavior.next(false)
    }
  }
}
