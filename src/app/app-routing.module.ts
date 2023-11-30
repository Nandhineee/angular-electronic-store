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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',component:HomeComponent,  },

  {path: 'product', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admincategory', component:AdmincategoryComponent},
  {path: 'adminproduct', component:AdminproductComponent},
  {path: 'adminview', component:AdmiviewComponent},
  {path: 'navbar', component:NavbarComponent},
  {path: 'adminorder', component:AdminorderComponent},


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
