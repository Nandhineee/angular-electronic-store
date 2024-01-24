import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';
import { ToasterService } from 'src/app/service/toaster.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css'],
})
export class SingleOrderComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/Order.json',
  };
  carts: Cart[] = [];
  itemprice: number = 0;
  itemcount: number = 0;

  error: string = '';
  addresses: Address[] = [];
  selectedAddresses: Address[] = [];
  address: string = '';

  selectedAddress: Address[] = [];

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private orderService: OrderService,
    private toaster: ToasterService,
    private userService: UserService,
    private router: Router
  ) {}

  UserAddress: Address[] = [];
  onSubmit(_AddressForm: NgForm) {
    let mappedProduct: Address = {
      phonenumber: _AddressForm.value.phonenumber,
      address: _AddressForm.value.address,
      city: _AddressForm.value.city,
      pincode: _AddressForm.value.pincode,

      userId: this.storageService.getLoggedInUser().id,
    };
    this.userService.postAddress(mappedProduct).subscribe({
      next: (response: any) => {
        this.UserAddress = response.data;
        this.toaster.success('Address added sucessfully');
        this.getAllAddress(this.storageService.getLoggedInUser().id);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
      complete: () => {
        console.log('There are no more action happen.');
      },
    });
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.userService.deleteAddress(id).subscribe({
        next: (response: any) => {
          this.address = response.data;
          console.log(response.data);

          let userId: number = this.storageService.getLoggedInUser().id;
          console.log(userId);

          this.getAllAddress(userId);
        },
        error: (err) => {
          console.log(err?.error?.error?.message);
        },
      });
    }
  }

  currentDate = new Date();

  year = this.currentDate.getFullYear();
  month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
  day = String(this.currentDate.getDate()).padStart(2, '0');

  issuedDate = `${this.day}-${this.month}-${this.year}`;
  ReturnDate = `${this.currentDate.getDate() + 3}-${this.month}-${this.year}`;

  ngOnInit(): void {
    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    console.log(loggedInUser.id);
    let userIdForAddress: number = this.storageService.getLoggedInUser().id;
    this.getAllAddress(userIdForAddress);

    this.cartService.getCart(userId).subscribe({
      next: (carts: any) => {
        let cartDetails: Cart[] = carts.data;
        console.log(carts.data);

        console.log(cartDetails);

        this.carts = cartDetails;
        this.carts.map((cart) => {
          console.log(this.itemprice);

          this.itemprice = this.itemprice + cart.count;
          this.itemcount = this.itemcount + cart.price * cart.count;
          console.log('After' + this.itemprice);
        });
      },
    });
  }

  getAllAddress(userId: number) {
    this.userService.getAllAddress(userId).subscribe({
      next: (response: AppResponse) => {
        if (response && response.data) {
          this.addresses = response.data.addressList;
          console.log(this.addresses);
        } else {
          console.error('Invalid API response format:', response);
        }
        // this.getAllAddress(this.storageService.getLoggedInUser().id);
      },
      error: (err) => {
        console.log('An error occurred:', err);
      },
      complete: () => console.log('There are no more actions happening.'),
    });
  }

  cartItem: Cart[] = this.storageService.getCart()!;
  orders: Order[] = [];
  Aid: number | undefined = 0;
  confirmOrder(selectedAddresses: Address[]) {
    console.log('ddddddddddddd' + selectedAddresses);

    for (let address of selectedAddresses) {
      this.Aid = address.id;
    }
    if (this.Aid) {
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
          this.Aid
        )
        .subscribe({
          next: (response: Order[]) => {
            console.log('response', response);
            this.orders = response;
            this.toaster.success('your order is confirmed');
            this.router.navigate(['/address'], { replaceUrl: true });


          },
          error: () => console.log('error'),
        });
  
    }
    

  }else{
    this.toaster.error('Please Add the Address');

  }
    this.storageService.setOrder(this.orders);
    return this.orders;
  }

  onAddressSelection(event: any, selectedAddress: Address) {
    if (event.target.checked) {
      // Add the selected address to the array
      this.selectedAddresses.push(selectedAddress);
      console.log(selectedAddress.id);
    }
  }
}
