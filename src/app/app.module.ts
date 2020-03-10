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

// guards import here
import { PharmRoleService } from './guards/pharm-role.service';
import { NotPharmRoleService } from './guards/not-pharm-role.service';
import { UserRoleGuardService} from "./user-role-guard.service";


// mapbox
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MatButtonModule, MatIconModule, MatListModule, MatSelectModule, MatSidenavModule, MatCardModule, MatTableModule } from "@angular/material";
import { MapboxComponent } from './mapbox/mapbox.component';
import {MatRadioModule} from '@angular/material/radio';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CartviewComponent } from './cartview/cartview.component';
import { QuantityComponent } from './quantity/quantity.component';
import { ProductsComponent } from './products/products.component';
import { CancelfromcartComponent } from './cancelfromcart/cancelfromcart.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RoshettaFormComponent } from './roshetta-form/roshetta-form.component';
import { RoshettaDetailsComponent } from './roshetta-details/roshetta-details.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConflictWarnningComponent } from './conflict-warnning/conflict-warnning.component';
import { SummeryviewComponent } from './summeryview/summeryview.component';
import { ItemSmallComponent } from './item-small/item-small.component';
import { HomeComponent} from './home/home.component';
import { SearchBarInHomeComponent } from './search-bar-in-home/search-bar-in-home.component';
import { JwPaginationComponent} from 'jw-angular-pagination';
import { PharmViewComponent } from './pharm-view/pharm-view.component';
import { PharmOrdersComponent } from './pharm-orders/pharm-orders.component';
import { PharmSmallOrderComponent } from './pharm-small-order/pharm-small-order.component';
import { PharmDetailedOrderComponent } from './pharm-detailed-order/pharm-detailed-order.component';
import { ConfirmItemComponent } from './confirm-item/confirm-item.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material';
import { VarDirective } from './var.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoshettaShowComponent } from './roshetta-show/roshetta-show.component';
import { CancelWarningComponent } from './cancel-warning/cancel-warning.component';

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
    SignUpComponent,
    SignInComponent,
    RoshettaFormComponent,
    RoshettaDetailsComponent,
    ConflictWarnningComponent,
    ItemSmallComponent,
    SummeryviewComponent,
    HomeComponent,
    SearchBarInHomeComponent,
    JwPaginationComponent,
    PharmViewComponent,
    PharmOrdersComponent,
    PharmSmallOrderComponent,
    PharmDetailedOrderComponent,
    ConfirmItemComponent,
    ConfirmationComponent,
    VarDirective,
    MapboxComponent,
    NotFoundComponent,
    RoshettaShowComponent,
    CancelWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule ,
    MatCheckboxModule,
  // mapbox
  NgxMapboxGLModule.withConfig({
    accessToken: 'pk.eyJ1IjoibWVkaWNhIiwiYSI6ImNrNnRmZHN3aDBvbngzaG52bWtyeDA4NzgifQ.tjL12W-8sV4kc6WiDxn1gA', // Optional, can also be set per map (accessToken input of mgl-map)
    geocoderAccessToken: 'pk.eyJ1IjoibWVkaWNhIiwiYSI6ImNrNnRmZHN3aDBvbngzaG52bWtyeDA4NzgifQ.tjL12W-8sV4kc6WiDxn1gA' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
  }),
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatCardModule,
  MatTableModule,
  MatRadioModule
  ],
  providers: [
    MatDatepickerModule,
    PharmRoleService,
    NotPharmRoleService,
    UserRoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
