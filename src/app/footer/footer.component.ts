import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  // properties
  subscribeForm: FormGroup;
  
  newsLEmails;
  emails;
  emailsCollection;

  emailInput;

  // constructor function
  constructor(private fBuilder: FormBuilder,
    private angularFS: AngularFirestore) {

    this.emails = this.angularFS.collection('subscribeEmails').valueChanges();
    this.emailsCollection = this.angularFS.collection('subscribeEmails');

  }

  ngOnInit() {

    // get 'subscribeEmails' collection from firebase
    this.getemails().subscribe(emails => {
      console.log(emails);
      this.newsLEmails = emails;
    })

    // subscribe form validation
    this.subscribeForm = this.fBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[A-z]{1}\\w{0,}@{1}[a-z]{1,}\\.{1}[a-z]{2,}\\.{0,1}[a-z]{0,5}$')]]
    });

    this.emailInput = document.getElementById('emailInput');
  }

  // subscribe form submit event function
  onSubmit(form: FormGroup) {
    let flag = false;
    if (this.newsLEmails) {
      if(this.newsLEmails.length > 0){
        for (let i = 0; i < this.newsLEmails.length; i++) {
          if (form.value.email == this.newsLEmails[i].email) {
            flag = true;
          }
        }
      }
    }

    if(flag == false){
      this.addItem(form.value);
      this.emailInput.value = '';
    }else{
      console.log('already exist')
    }
  }

  // firebase get and post functions
  getemails() {
    return this.emails;
  }

  addItem(emailToadd) {
    this.emailsCollection.add(emailToadd);
  }
}
