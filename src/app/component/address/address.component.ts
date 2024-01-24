import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToasterService } from 'src/app/service/toaster.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  options: AnimationOptions = {
   path: "/assets/Order.json",
    
  };
  
  error: string = '';
  orders: Order[]=[];

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private orderService:OrderService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    let userId: any = this.storageService.getLoggedInUser().id;
    this.getAllOrders(userId);
  }


  currentDate = new Date();

  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');

  issuedDate = `${this.day}-${this.month}-${this.year}`;
  ReturnDate = `${this.currentDate.getDate() + 3}-${this.month}-${this.year}`;

  getAllOrders(userId: number) {
    this.orderService.getAllOrders(userId).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.orders = response.data;
          console.log('this is oreders-->', this.orders);
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      error: (err: any) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

}
