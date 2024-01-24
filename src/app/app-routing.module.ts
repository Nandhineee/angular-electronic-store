import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { authGuard } from './guard/auth.guard';
import { ProductComponent } from './component/product/product.component';
import { OrderComponent } from './component/order/order.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminproductComponent } from './component/admin/adminproduct/adminproduct.component';
import { AdmincategoryComponent } from './component/admin/admincategory/admincategory.component';
import { AdmiviewComponent } from './component/admin/admiview/admiview.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AdminorderComponent } from './component/admin/adminorder/adminorder.component';
import { HomeComponent } from './component/home/home.component';
import { SingleOrderComponent } from './component/single-order/single-order.component';
import { AddressComponent } from './component/address/address.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home',component:HomeComponent,  },

  {path: 'product', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admincategory', component:AdmincategoryComponent},
  {path: 'adminproduct', component:AdminproductComponent},
  {path: 'adminview', component:AdmiviewComponent},
  {path: 'navbar', component:NavbarComponent},
  {path: 'adminorder', component:AdminorderComponent},
  {path: 'singleorder', component:SingleOrderComponent},
  {path: 'address', component:AddressComponent},
  {path: 'dashboard', component:DashboardComponent},



  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
