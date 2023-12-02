import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];


  constructor(private cartService:CartService,private storageService:StorageService,private orderService:OrderService){}

  ngOnInit(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    this.cartService.getCart(userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
        console.log(carts);
}
    });
  }
  
  onDelete(deleteid: any, productId: any): void {
    console.log(deleteid, productId);

    this.cartService.deleteCart(deleteid, productId).subscribe({
      next: (cart: Cart[]) => {
        this.carts = cart;
        console.log(cart);
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
  }
  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 64;

  checkOut() {
    
    for (let item of this.carts) {
      this.orders.push({
        id: 0,
        total: item.total,
        username: this.storageService.getLoggedInUser().username,
        gadgetList: [
          {
            id: item.gadgetId,
            title: item.title,
            price: item.price,
            count: item.count,
          },
        ],
      });

      console.log('order', this.orders);

      this.orderService
        .createOrder(item.userId, item.gadgetId, this.addressId)
        .subscribe({
          next: (response: Order[]) => {
            console.log('response', response);
            this.orders = response;
          },
          complete: () => console.log('orderCreated'),
          error: () => console.log('error'),
        });
    }
    this.storageService.setOrder(this.orders);
    return this.orders;
  }


  
}
