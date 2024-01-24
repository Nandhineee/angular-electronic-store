import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css'],
})
export class AdminproductComponent implements OnInit {
  products: Product[] = [];

  error: string = '';
  file: any = null;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response.data);
        let productDetails: Product[] = response.data;
        this.products = productDetails;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
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

  // addProduct(products: {
  //   productName: string;
  //   productPrice: string;
  //   productDescription: string;
  // }) {
  //   console.log(products);
  //   let mappedProduct: Product = {
  //     title: products.productName,
  //     description: products.productDescription,
  //     price: products.productPrice,
  //     categoryId: 1,
  //   };
  //   this.productService.postProduct(mappedProduct)
  //     .subscribe({
  //       next: (response: any) => {
  //         this.products = response.data;
  //         console.log(response);
  //       },
  //       error: (err) => {
  //         console.log(err?.error?.error?.message);
  //       },

  //     })
  // }
  onSubmit(productForm: NgForm): void {
    console.log(productForm.value);

    const formData = new FormData();
    formData.append('photo', this.file);
    formData.append('title', productForm.value.title);
    formData.append('stock', productForm.value.stock);


    formData.append('price', productForm.value.price);
    formData.append('description', productForm.value.description);

    console.log(formData);

    this.productService.postProduct(formData).subscribe({
      next: (response) => {
        this.products = response.data;
        console.log('for' + response.data);
      },
      error: (err) => {
        console.error('An error occurred while adding the book', err);
      },
      complete: () => {
        console.log('Book addition complete.');
      },
    });
  }
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      // console.log('Selected file', this.file);
    }
  }
}
