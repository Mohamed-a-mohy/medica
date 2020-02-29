import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from "angularfire2/firestore";
<<<<<<< HEAD
import { Router,  NavigationEnd } from '@angular/router';
=======
import { Router } from '@angular/router';
>>>>>>> mohamed

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users;
  checkLoginBehavior = new BehaviorSubject(false);
  checkLogin$ = this.checkLoginBehavior.asObservable();
  userIdBehavior = new BehaviorSubject('');
  userId$ = this.userIdBehavior.asObservable();
<<<<<<< HEAD
  previousUrl: string;
  currentUrl: string;
=======
>>>>>>> mohamed

  constructor(
    private angularFS: AngularFirestore,
    private router: Router) { 
    this.users = this.angularFS.collection("users").valueChanges({idField:'id'});
    this.changeLoginStatus(localStorage.getItem('checkLogin'))
    this.users.subscribe(items => {
      this.users = items;
    });
<<<<<<< HEAD
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

=======
  }
>>>>>>> mohamed
  checkValidUser(form): void {
    for (let user of this.users) {
      if (
        user["email"] == form.value.email &&
<<<<<<< HEAD
        user["password"] == form.value.password
=======
        user["password"] == form.value.password &&
        user['role'] == 'user'
>>>>>>> mohamed
      ) {
        localStorage.setItem("checkLogin", "true");
        this.changeLoginStatus(localStorage.getItem("checkLogin"));
        localStorage.setItem('userId', user.id);
        this.addUserId(localStorage.getItem('userId'));
<<<<<<< HEAD
        localStorage.setItem('userRole', user['role']);
        this.router.navigate([this.previousUrl]);
=======
        this.router.navigate(['/home']);
>>>>>>> mohamed
        return;
      }
    }
    document.getElementsByClassName("mesError")[1].innerHTML = "";
    document.getElementsByClassName("mesError")[0].innerHTML =
      "*Email or password is invalid";
  }

  changeLoginStatus(userstatus){
    this.checkLoginBehavior.next(userstatus)
  }
  addUserId(id){
    this.userIdBehavior.next(id);
  }
}
