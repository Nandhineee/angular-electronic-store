import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];


  constructor(private cartService:CartService,private storageService:StorageService){}

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


  
}
