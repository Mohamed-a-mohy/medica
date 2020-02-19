import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  users;
  myForm: FormGroup;
  itemCollection: AngularFirestoreCollection;
  selectedFile:File;
  fileData: File = null;
  image: any;

  constructor(
    private fb: FormBuilder,
    private angularFS: AngularFirestore) {
    this.itemCollection = this.angularFS.collection("users");
    this.users = this.angularFS.collection("users").valueChanges();
  }

  ngOnInit() {
    this.users.subscribe(items => {
      this.users = items;
    });
    this.myForm = this.fb.group(
      {
        userName: ["", [Validators.required, Validators.minLength(3)]],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{8,}$/
            )
          ]
        ],
        passwordConfirm: ["", [Validators.required, MustMatch]],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(/^\w+([\.-]?\w+)*@\w+\.com$/)
          ]
        ],
        checkInsurance: [false],
        insuranceNum: ["", [ Validators.pattern(/^\d{5}$/)]],
        image:null
      },
      { validator: MustMatch("password", "passwordConfirm") }
    );
  }
  checkNewUser() {
    for (let user of this.users) {
      if (user["email"] == this.myForm.value.email) {
        return false;
      }
    }
    return true;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      document.getElementsByClassName("mesError")[0].innerHTML = "*please fill your form or sign in";
    }else if (this.checkNewUser()) {
      this.itemCollection.add({
        userName: this.myForm.value.userName,
        email: this.myForm.value.email,
        password: this.myForm.value.password,
        checkInsurance: this.myForm.value.checkInsurance,
        insuranceNum: this.myForm.value.insuranceNum,
        image: this.myForm.value.image,
        role: "user"
      });
      localStorage.setItem("checkLogin", "true");
    } else {
      document.getElementsByClassName("mesError")[1].innerHTML = "*user is already exist";
    }
    
  }
  
  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }
  preview() {
    let mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.image = reader.result;
      this.myForm.patchValue({
        image: this.image
      });
    }
  }


}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
