import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  total: number = 0;


  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    this.cartService.getCart(userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        this.carts = cartDetails;
      },
    });
  }

  onDelete(deleteid: number, productId: number): void {
    console.log(deleteid, productId);

    this.cartService.deleteCart(deleteid, productId).subscribe({
      next: (cart: any) => {
        this.carts = cart.data;
      },
      complete: () => console.log('deleted'),
      error: () => console.log('error'),
    });
  }
  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  addressId: number = 1;

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
        .createOrder(
          this.storageService.getLoggedInUser().id,
          item.gadgetId,
          this.addressId
        )
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

  cartcount(cartId: number, count: number): void {}

  decrement(cartid: number, count: number, gadgetId: number) {
    this.productService
      .incrementAndDecrement(
        this.storageService.getLoggedInUser().id,
        gadgetId,
        count-1
      )
      .subscribe({
        next: (response: any) => {
          this.carts = response.data;
        },
      });
  }

  increment(cartid: number, count: number, gadgetId: number) {
    this.productService
      .incrementAndDecrement(
        this.storageService.getLoggedInUser().id,
        gadgetId,
        count+1
      )
      .subscribe({
        next: (response: any) => {
          this.carts = response.data;
        },
      });
  }
}
