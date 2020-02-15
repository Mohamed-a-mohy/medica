import { Component,OnInit } from '@angular/core';
import { AddtocartService } from './addtocart.service';


// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//endhere

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medica';
  itemCollection;
  arrOfItems;
  items;

  constructor(db: AngularFireDatabase,
    private angularFS: AngularFirestore,
    private service: AddtocartService){
    // get data from database
    this.items = this.angularFS.collection('products').valueChanges({idField: 'id'});
    this.itemCollection = this.angularFS.collection('products');
        // get data from database
        this.getItems().subscribe(items =>{
          this.arrOfItems = items;
          this.addQuantityProp();
          // store data in service
          this.service.dbData = items;
          console.log('data with quantity property from app component: ', this.arrOfItems)
        })
  }
  ngOnInit(){}

  getItems(){
    return this.items;
    }
  
    addQuantityProp(){
      for(let i = 0; i< this.arrOfItems.length; i++){
        this.arrOfItems[i].quantity = 0;
      }
    }

}