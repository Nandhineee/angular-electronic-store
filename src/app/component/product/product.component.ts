import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  error:string="";
  products:Product[]=[];
  


  constructor(private productService:ProductService){}


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

}
