import { Component, OnInit } from '@angular/core';
import { PharmServiceService } from '../pharm-service.service';
import { LoginService } from '../login.service';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// import router
import { Router } from '@angular/router';
// form
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pharm-view',
  templateUrl: './pharm-view.component.html',
  styleUrls: ['./pharm-view.component.scss']
})
export class PharmViewComponent implements OnInit {
  
  pharmData;
  pharmObj:object = {};
  // form
  settingForm: FormGroup;
  settingFormErrorMsg:string = '';
  // properties of form inputs elements
  currentPasswordInput;
  newPasswordInput;
  confirmPasswordInput;

  constructor(private angularFS: AngularFirestore,
    private router: Router,
    private pharmService: PharmServiceService,
    private loginService: LoginService) {

    // --------------------------------------------------
    // get pharmacy data from database --> change pharmacy password from setting
    // --------------------------------------------------
    this.pharmData = this.angularFS.doc('pharmacies/'+ localStorage.getItem('userId')).valueChanges();
    this.pharmData.subscribe(data => {
      this.pharmObj = data;
    })
   }

  ngOnInit() {
    // --------------------------------------------------
    // setting form validation
    // --------------------------------------------------
    this.settingForm = new FormGroup({
      currentPassword:new FormControl(['']),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]{8,}$/)])
    });

    // --------------------------------------------------
    // properties of form inputs elements
    // --------------------------------------------------
    this.currentPasswordInput = document.getElementById('currentPasswordInput');
    this.newPasswordInput = document.getElementById('newPasswordInput');
    this.confirmPasswordInput = document.getElementById('confirmPasswordInput');
  }

  // --------------------------------------------------
  // when pharmacy click on 'logout' button
  // --------------------------------------------------
  onLogout(){
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.loginService.changeLoginStatus('logout');
    this.router.navigate(['/home']);
  }

  // --------------------------------------------------
  // when pharmacy change its current password
  // --------------------------------------------------
  changeSetting(e){
    if(this.settingForm.valid){
      if(this.settingForm.value.currentPassword == this.pharmObj['password']){
        if(this.settingForm.value.newPassword == this.settingForm.value.confirmPassword){
          this.pharmObj['password'] = this.settingForm.value.newPassword;
          this.updateItem('pharmacies', localStorage.getItem('userId'), this.pharmObj);
          e.target.setAttribute('data-dismiss',"modal"); // close the popup
          this.resetValues();
        }else{
          this.settingFormErrorMsg = 'The confirm password not matched with your new password';
        }
      }else{
        this.settingFormErrorMsg = 'The current password invalid';
      }
    }else{
      this.settingFormErrorMsg = 'Your password not valid';
    }
  }

  removeErrorMsg(){
    this.settingFormErrorMsg = '';
  }

  // --------------------------------------------------
  // empty input values + form object values
  // --------------------------------------------------
  resetValues(){
    this.currentPasswordInput.value = '';
    this.newPasswordInput.value = '';
    this.confirmPasswordInput.value = '';
    this.settingForm.value.currentPassword = '';
    this.settingForm.value.newPassword = '';
    this.settingForm.value.confirmPassword = '';
  }

  // --------------------------------------------------
  // firebase function to update pharmacy info (password)
  // --------------------------------------------------
  updateItem(collection, id, order){
    let itemDoc = this.angularFS.doc(collection + '/' + id);
    itemDoc.update(order);
  }

}
