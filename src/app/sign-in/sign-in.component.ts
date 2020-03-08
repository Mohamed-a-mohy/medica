import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { LoginService } from "../login.service";

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
  constructor(
    private fb: FormBuilder,
    private angularFS: AngularFirestore,
    private loginService: LoginService
  ) {
    this.users = this.angularFS.collection("users").valueChanges();
  }

  ngOnInit() {
    this.users.subscribe(items => {
      this.users = items;
    });

    this.myForm = this.fb.group({
      email: "",
      password: "",
      pharmacyCheck: false
    });
  }

  

  onSubmit(form: NgForm) {

    if (this.myForm.value.email && this.myForm.value.password) {
      this.loginService.checkValidUser(form);
    } else {
      document.getElementsByClassName("mesError")[0].innerHTML = "";
      document.getElementsByClassName("mesError")[1].innerHTML =
        "please enter your email and password";
    }
    this.loginService.checkLoginBehavior.next(true); // display login / logout icon in navbar
  }
}
