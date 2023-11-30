import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartResp } from 'src/app/model/cart-resp';
import { Item } from 'src/app/model/item';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  error:string="";
  products:Product[]=[];
  Items: Item[] = [];
  UserCart: CartResp[] = [];
  


  constructor(private productService:ProductService,private storageService:StorageService){}


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

  


  // addToCart(id: number): void {
  //   let isPresent: Item = this.UserCart.find((item) => item.item.id === id)
  //     ?.item!;
  //   console.log(isPresent);

  //   if (!this.UserCart.find((item) => item.item.id === id)) {
  //     console.log('Added 1');

  //     let Cart: Cart = {
  //       userId: this.storageService.getLoggedInUser().id,
  //       gadgetId: id,
  //       count: 1,
  //     };
  //     this.productService.addToCart(Cart).subscribe({
  //       next: (resp: any) => {
  //         this.UserCart = resp.data;
  //         console.log(this.UserCart);
  //       },
  //     });
  //   } else {
  //     console.log(
  //       this.UserCart.find((cartItem) => cartItem.item.id === id)?.count
  //     );

  //     let Cart: Cart = {
  //       userId: this.storageService.getLoggedInUser().id,
  //       gadgetId: id,
  //       count:
  //         this.UserCart.find((cartItem) => cartItem.item.id === id)?.count! + 1,
  //     };
  //     this.productService.addToCart(Cart).subscribe({
  //       next: (resp: any) => {
  //         this.UserCart = resp.data;
  //         console.log(this.UserCart);
  //       },
  //     });
  //   }
  // }


}
