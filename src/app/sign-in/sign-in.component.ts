import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  myForm: FormGroup;
  users;
  user;
  imageSrc;
  constructor(private fb: FormBuilder, private angularFS: AngularFirestore) {
    this.users = this.angularFS.collection("users").valueChanges();
  }

  ngOnInit() {
    this.users.subscribe(items => {
      this.users = items;
    });

    this.myForm = this.fb.group({
      email: "",
      password: ""
    });
  }

  checkValidUser():void {
    for (let user of this.users) {
      if (user["email"] == this.myForm.value.email && user["password"] == this.myForm.value.password) {
        this.user = user;
        console.log(user);
        return;
      }
    }
    document.getElementsByClassName("mesError")[1].innerHTML =""
      document.getElementsByClassName("mesError")[0].innerHTML = "*Email or password is invalid";
  }

  onSubmit(form: NgForm) {
    if(this.myForm.value.email && this.myForm.value.password){
      this.checkValidUser();
    } else{
      document.getElementsByClassName("mesError")[0].innerHTML =""
      document.getElementsByClassName("mesError")[1].innerHTML = "please enter your email and password";
    }
  }
}

