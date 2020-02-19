import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductdetailsComponent} from './productdetails/productdetails.component';
import { CartviewComponent } from "./cartview/cartview.component";
import { ProductsComponent} from "./products/products.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';



const routes: Routes = [
  {path: "products", component: ProductsComponent},
  {path: "shop", component: CartviewComponent},
  {path:"signUp", component: SignUpComponent},
  {path:"sigIn", component: SignInComponent},
  {path: "product/:id", component: ProductdetailsComponent},
  // {path:"product/category/:cat", component:ProductsComponent},
  // {path:"product/category/:cat/:sCat", component:ProductsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

