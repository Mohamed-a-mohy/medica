import { Component, OnInit,Input } from '@angular/core';

// firebase imports starts here
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
//endhere
// route import
import { ActivatedRoute } from '@angular/router';

// serve import
import { AddtocartService } from '../addtocart.service';
import { QuantityService } from '../quantity.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() item;
  itemCollection;
  arrOfItems;
  items;
  

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
  

    this.getItems().subscribe(items =>{
      console.log(items);
      this.arrOfItems = items;
    })
  }


  getItems(){
  return this.items;
  }
}

