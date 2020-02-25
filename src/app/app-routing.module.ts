import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductdetailsComponent} from './productdetails/productdetails.component';
import { CartviewComponent } from "./cartview/cartview.component";
import { ProductsComponent} from "./products/products.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SummeryviewComponent } from './summeryview/summeryview.component';
import { PharmViewComponent } from './pharm-view/pharm-view.component';
import { PharmOrdersComponent } from './pharm-orders/pharm-orders.component';




const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "shop", component: CartviewComponent},
  {path:"signUp", component: SignUpComponent},
  {path:"sigIn", component: SignInComponent},
  {path: "product/:id", component: ProductdetailsComponent},
  {path: "home" ,component:HomeComponent},
  {path: "order-summery", component:SummeryviewComponent},
  {path: "pharmview", component:PharmViewComponent},
  {path: "pharmview/pending", component:PharmOrdersComponent},
  {path: "pharmview/inprogress", component:PharmOrdersComponent},
  {path: "pharmview/orders", component:PharmOrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

