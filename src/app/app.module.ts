import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// firebase imports starts here
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
// firebase imports ends here

import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ItemComponent } from './item/item.component';
import { BtntocartComponent } from './btntocart/btntocart.component';
// firebase imports ends here
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CartviewComponent } from './cartview/cartview.component';
import { QuantityComponent } from './quantity/quantity.component';
import { ProductsComponent } from './products/products.component';
import { CancelfromcartComponent } from './cancelfromcart/cancelfromcart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductdetailsComponent,
    ItemComponent,
    BtntocartComponent,
    NavbarComponent,
    FooterComponent,
    CartviewComponent,
    QuantityComponent,
    ProductsComponent,
    CancelfromcartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
