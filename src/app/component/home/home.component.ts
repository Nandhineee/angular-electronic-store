import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { StorageService } from 'src/app/service/storage.service';
import { ProductService } from 'src/app/service/product.service';
import { Item } from 'src/app/model/item';
import { CartResp } from 'src/app/model/cart-resp';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { AppUser } from 'src/app/model/appUser';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error:string="";
  products:Product[]=[];
  carts: Cart[] = [];
  totalValue: number = 0;
  selectedItem: string = '';
  total: number = 0;
  user:AppUser;
  

  
  itemCount: number = 1;




  constructor(private productService:ProductService,
     private storageService:StorageService,    
     private homeService: HomeService,

     private cartService: CartService,
     private stoargeService: StorageService,
     private router: Router,
     private orderService: OrderService
 )
 {
  this.user= this.stoargeService.getLoggedInUser();
}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next:(response:any)=> {
        
        let productDetails: Product[] = response.data;
        this.products = productDetails;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    })
  }
  addToCart(productId: number): void {
    console.log(productId);

    this.productService.addToCart(this.storageService.getLoggedInUser()?.id, productId)
      .subscribe((Response) => console.log(Response));
    error: () => console.log('product not added in cart');
  }
  calculateTotalValue(): void {
    this.totalValue = this.carts.reduce(
      (acc, cart) => acc + cart.count * cart.price,
      0
    );
    // this.ngOnInit();
  }
  // onDelete(deleteid: number, productId: number): void {
  //   console.log(deleteid, productId);

  //   this.cartService.deleteCart(deleteid, productId).subscribe({
  //     next: (cart: Cart[]) => {
  //       this.carts = cart;
  //       console.log(cart);
  //     },
  //     complete: () => console.log('deleted'),
  //     error: () => console.log('error'),
  //   });
  //   this.ngOnInit();
  // }
  increamentCount(cart: Cart) {
    //add product only 3
    if (cart.count != 3) {
      cart.count += 1;
      this.cartService.cartCountUpdate(this.user.id, cart.gadgetId, cart.count, this.total)
        .subscribe((response) => console.log(response));
    }
  }
  decrementCount(cart: Cart) {
    if (cart.count != 1) {
      cart.count -= 1;
      this.cartService
        .cartCountUpdate(this.user.id, cart.gadgetId, cart.count, this.total)
        .subscribe((response) => console.log(response));
    }
  }
  // cartItem: Cart[] = this.stoargeService.getCart()!;
  // orders: Order[] = [];
  // addressId: number = 64;

  // checkOut(): Order[] {
  //   for (let item of this.cartItem) {
  //     this.orders.push({
  //       id: 0,
  //       total: item.total,
  //       username: this.stoargeService.getLoggedInUser().username,
  //       gadgetList: [
  //         {
  //           id: item.gadgetId,
  //           title: item.title,
  //           price: item.price,
  //           count: item.count,
  //         },
  //       ],
  //     });

  //     //console.log('order', this.orders);

  //     this.orderService
  //       .createOrder(item.userId, item.gadgetId, this.addressId)
  //       .subscribe({
  //         next: (response: Order[]) => {
  //           console.log('response', response);
  //           this.orders = response;
  //         },
  //         complete: () => console.log('orderCreated'),
  //         error: () => console.log('error'),
  //       });
  //   }
  //   this.stoargeService.setOrder(this.orders);
  //   return this.orders;
  // }
}



