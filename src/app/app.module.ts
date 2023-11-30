import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { AdminproductComponent } from './component/admin/adminproduct/adminproduct.component';
import { AdmincategoryComponent } from './component/admin/admincategory/admincategory.component';
import { AdmiviewComponent } from './component/admin/admiview/admiview.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AdminorderComponent } from './component/admin/adminorder/adminorder.component';
import { HomeComponent } from './component/home/home.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    CartComponent,
    OrderComponent,
    AdminproductComponent,
    AdmincategoryComponent,
    AdmiviewComponent,
    NavbarComponent,
    // DashboardComponent,
    AdminorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
