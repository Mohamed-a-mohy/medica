import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductdetailsComponent} from './productdetails/productdetails.component'
import { CartviewComponent } from "./cartview/cartview.component"



const routes: Routes = [
  {path: "products", component: ProductdetailsComponent},
  { path: "products/:id", component: ProductdetailsComponent },
  {path: "shop", component: CartviewComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

