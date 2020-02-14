import { Component, OnInit,Input } from '@angular/core';
// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
//endhere

// route import
import { ActivatedRoute } from '@angular/router';

// serve import
import { AddtocartService } from '../addtocart.service';
import { QuantityService } from '../quantity.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  @Input() item
  collapse1;
  collapse2;
  collapse3;
  collapse4;
  items;
  itemCollection;
  arrOfItems;


  // properties of route code
  product;
  productID;

  // quantity of the product in cart
  itemsInCart;
  index;
  flag;


  constructor(private angularFS: AngularFirestore,
    private route: ActivatedRoute,
    private service: AddtocartService,
    private quantityService: QuantityService) { 

    this.items = this.angularFS.collection('products').valueChanges({ idField: 'id' });
    this.itemCollection = this.angularFS.collection('products');

        // route code

      this.route.params.subscribe( params => {
        this.product = params;
        this.productID = this.product.id;
        this.service.cartItems.subscribe(items=>{
          this.itemsInCart=items;
          if(this.itemsInCart[0]){
            for(let i = 0; i< this.itemsInCart.length; i++){
              if(this.productID == this.itemsInCart[i].id){
                this.index = i;
                this.flag = true;
              }
            }
            if(this.flag){
              this.quantityService.changeQuantityCount(this.itemsInCart[this.index].quantity);
            }else{
              this.quantityService.changeQuantityCount(0);
            }
          }else{
            this.quantityService.changeQuantityCount(0);
          }
        })
        });
  }

  ngOnInit() {
    // this.quantity = 2;
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


