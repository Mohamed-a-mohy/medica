import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AddtocartService } from '../addtocart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  // properties
  subscribeForm: FormGroup;
  
  newsLEmails = [];
  emails;
  emailsCollection;

  emailInput;

  msgToDisplay:string;

  // constructor function
  constructor(private fBuilder: FormBuilder,
    private angularFS: AngularFirestore,
    private service: AddtocartService) {

    this.emails = this.angularFS.collection('subscribeEmails').valueChanges();
    this.emailsCollection = this.angularFS.collection('subscribeEmails');

  }

  ngOnInit() {

    // get 'subscribeEmails' collection from firebase
    this.emails.subscribe(emails => {
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
    let check:Array<string>;

    if(form.valid){ // user input correct
      if(this.newsLEmails[0]){ // there is emails in database
        check = this.newsLEmails.filter(item => item.email == form.value.email)
      }
      
      if(check[0]){ // the email is already in db
        this.msgToDisplay = 'Your email already exist';
      }else{ // the email isn't in db
        this.msgToDisplay = 'Thank you for subscribe';
        this.addItem(form.value);
        this.emailInput.value = '';
      }
      
    }else{ // user input wrong
      this.msgToDisplay = 'Your email not valid';
    }
  }

  // firebase post function

  addItem(emailToadd) {
    this.emailsCollection.add(emailToadd);
  }
}
