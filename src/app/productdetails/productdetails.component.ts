import { Component, OnInit,Input } from '@angular/core';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//endhere

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  @Input() item
  quantity;
  collapse1;
  collapse2;
  collapse3;
  collapse4;
  items;
  itemCollection;
  arrOfItems;
  constructor(private angularFS: AngularFirestore) { 
    this.items = this.angularFS.collection('products').valueChanges({ idField: 'id' });
    this.itemCollection = this.angularFS.collection('products');
  }

  ngOnInit() {
    this.quantity = 2;
    this.collapse1=document.getElementById("collapse1")
    this.collapse2=document.getElementById("collapse2")
    this.collapse3=document.getElementById("collapse3")
    this.collapse4=document.getElementById("collapse4")
    console.log(this.collapse1);
    console.log(this.item);


    this.getItems().subscribe(items =>{
      console.log(items);
      this.arrOfItems = items;
    })
  }




  getItems(){
    return this.items;
  }

 /*  checkcolps(){
   if(this.collapse1.className=="collapse show"){
      this.collapse2.classList="collapse";
      this.collapse3.classList="collapse";
      this.collapse4.classList="collapse";
      
      console.log("if")
    }else{
      console.log("else");
      
    } */
    /*   className.replace(" active", "") */
 /*    console.log("hi");}
                           */
    
  
}


/* $('#example').popover(options) */


