import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css']
})
export class AdminproductComponent implements OnInit {
  
  products: Product[] = [];

  error: string = "";




  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response);
        let productDetails: Product[] = response.data;
        this.products = productDetails;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },

    });


  }

  onDelete(id: number): void {
    console.log(id);
    this.productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.products = response.data;
        console.log(response);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }

  addProduct(products: {
    productName: string;
    productPrice: string;
    productDescription: string;
  }) {
    console.log(products);
    let mappedProduct: Product = {
      title: products.productName,
      description: products.productDescription,
      price: products.productPrice,
      categoryId: 1,
    };
    this.productService.postProduct(mappedProduct)
      .subscribe({
        next: (response: any) => {
          this.products = response.data;
          console.log(response);
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
  
      })
  }

  }








