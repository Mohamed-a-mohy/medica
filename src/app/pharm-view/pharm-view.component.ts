import { Component, OnInit } from '@angular/core';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pharm-view',
  templateUrl: './pharm-view.component.html',
  styleUrls: ['./pharm-view.component.scss']
})
export class PharmViewComponent implements OnInit {
  
  pharmData;
  pharmObj = {};

  constructor(private angularFS: AngularFirestore) {

    this.pharmData = this.angularFS.doc('users/'+ localStorage.getItem('userId')).valueChanges();
    this.pharmData.subscribe(data => {
      this.pharmObj = data;
    })
   }

  ngOnInit() {
  }

}
