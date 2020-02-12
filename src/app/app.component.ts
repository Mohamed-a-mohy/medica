import { Component,OnInit } from '@angular/core';


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


 itemCollection: AngularFirestoreCollection;
  items;
  test;
  itemDoc: AngularFirestoreDocument;

  // objects to test with them
  itemToadd = {
    phones: [666, 777]
  }

  itemToEdit = {
    phones: [990]
  }

  constructor(db: AngularFireDatabase, private angularFS: AngularFirestore){
    // I don't know if that {{db: AngularFireDatabase}} is important
    this.items = this.angularFS.collection('products').valueChanges();
    this.itemCollection = this.angularFS.collection('products');
  }

  ngOnInit(){
    this.getItems().subscribe(items =>{
      console.log(items);
      this.test = items;
    })
  }
  
  getItems(){
    return this.items;
  }

  addItem(itemToadd){
    this.itemCollection.add(itemToadd)
  
  }

  deleteItem(){
    this.itemDoc = this.angularFS.doc('products/0');
    // test above == collection name
    // D7KqHhKUvTx9EsfcGFy6 is id of document
    this.itemDoc.delete();
  }

  updateItem(){
    this.itemDoc = this.angularFS.doc('products/0');
    this.itemDoc.update(this.itemToEdit);
  }

}
