import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItem: number = 0;

  isAdmin:Boolean = false;
  constructor( private authService: AuthService,private storageService:StorageService){}
  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
  logout(): void {
    this.authService.logout();
  }
  // ngOnInit(): void {
  //   this.cartItemFunc();
  // }
  // cartItemFunc() {
  //   let cartItems = this.storageService.getCart();
  //   if (cartItems != null) {
  //     // this.cartItem = cartItems.length;
  //     if(this.storageService.removeLoggedInUser === null)
  //     this.cartItem=0;

  //   }
  // }


}
