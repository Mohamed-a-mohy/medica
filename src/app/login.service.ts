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
  userIdBehavior = new BehaviorSubject('');
  userId$ = this.userIdBehavior.asObservable();
  previousUrl: string;
  currentUrl: string;
  
  // login and logout behavior update
  checkLoginBehavior = new BehaviorSubject('logout');
  checkLogin$ = this.checkLoginBehavior.asObservable();

  constructor(
    private angularFS: AngularFirestore,
    private router: Router) { 
    this.users = this.angularFS.collection("users").valueChanges({idField:'id'});
    this.changeLoginStatus(localStorage.getItem('role')); // login and logout behavior update
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
          localStorage.setItem('userId', pharmacy.id);
          this.addUserId(localStorage.getItem('userId'));
          localStorage.setItem('role', pharmacy['role']);
          this.changeLoginStatus(pharmacy['role']);
          return;
        }
      }
    } else{
      for (let user of this.users) {
        if (
          user["email"] == form.value.email &&
          user["password"] == form.value.password
        ) {
          localStorage.setItem('userId', user.id);
          this.addUserId(localStorage.getItem('userId'));
          localStorage.setItem('role', user['role']);
          this.changeLoginStatus(user['role']);
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
  // login and logout behavior update
  // ---------------------------------------------------------- 
  changeLoginStatus(userstatus:string){
    if(userstatus == 'user'){
      this.checkLoginBehavior.next('user');
      if(sessionStorage.getItem('checkOutPath')){
        this.router.navigate([sessionStorage.getItem('checkOutPath')]);
      } else{
        this.router.navigate(['/home']);
      }

    }else if(userstatus == 'pharmacy'){
      this.checkLoginBehavior.next('pharmacy');
      this.router.navigate(['/pharmview']);

    }else{
      this.checkLoginBehavior.next('logout');
    }
  }
}
