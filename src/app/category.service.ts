import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//endhere

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  items;
  itemCollection;

  constructor(
    router: Router,
    location: Location,
    db: AngularFireDatabase,
    private angularFS: AngularFirestore,){
      this.items = this.angularFS.collection('products').valueChanges({ idField: 'id' });
      this.itemCollection = this.angularFS.collection('products'); 
    }
}
