import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from "angularfire2/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users;
  checkLoginBehavior = new BehaviorSubject(false);
  checkLogin$ = this.checkLoginBehavior.asObservable();
  userIdBehavior = new BehaviorSubject('');
  userId$ = this.userIdBehavior.asObservable();

  constructor(
    private angularFS: AngularFirestore,
    private router: Router) { 
    this.users = this.angularFS.collection("users").valueChanges({idField:'id'});
    this.changeLoginStatus(localStorage.getItem('checkLogin'))
    this.users.subscribe(items => {
      this.users = items;
    });
  }
  checkValidUser(form): void {
    for (let user of this.users) {
      if (
        user["email"] == form.value.email &&
        user["password"] == form.value.password &&
        user['role'] == 'user'
      ) {
        localStorage.setItem("checkLogin", "true");
        this.changeLoginStatus(localStorage.getItem("checkLogin"));
        localStorage.setItem('userId', user.id);
        this.addUserId(localStorage.getItem('userId'));
        this.router.navigate(['/home']);
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
