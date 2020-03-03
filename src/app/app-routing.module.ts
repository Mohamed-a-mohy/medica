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
import { PharmRoleService } from './guards/pharm-role.service';
import { NotPharmRoleService } from './guards/not-pharm-role.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';





const routes: Routes = [
  {path: "products", component: ProductsComponent, canActivate: [NotPharmRoleService]},
  {path: "shop", component: CartviewComponent, canActivate: [NotPharmRoleService]},
  {path:"signUp", component: SignUpComponent, canActivate: [NotPharmRoleService]},
  {path:"sigIn", component: SignInComponent, canActivate: [NotPharmRoleService]},
  {path: "product/:id", component: ProductdetailsComponent, canActivate: [NotPharmRoleService]},
  {path: "home" ,component:HomeComponent, canActivate: [NotPharmRoleService]},
  {path: "" , redirectTo:'/home', pathMatch: 'full', canActivate: [NotPharmRoleService]},
  {path: "order-summery", component:SummeryviewComponent, canActivate: [NotPharmRoleService]},
  {path: "pharmview/pending", component:PharmOrdersComponent, canActivate: [PharmRoleService]},
  {path: "pharmview/inprogress", component:PharmOrdersComponent, canActivate: [PharmRoleService]},
  {path: "pharmview/orders", component:PharmOrdersComponent, canActivate: [PharmRoleService]},
  {path: "confirm", component:ConfirmationComponent ,canActivate: [NotPharmRoleService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

