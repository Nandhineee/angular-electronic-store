import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    console.log('Navbar Component View is initialized');
  }
  itemsInCart = 0;

  cartItem: number = 0;
  cartCount = 0;



  isAdmin:Boolean = false;
  
  constructor( private authService: AuthService,private storageService:StorageService,
    private cartService:CartService){}
  ngOnInit(): void {

    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;

    });

  }
  logout(): void {
    this.authService.logout();

  }

  addToCart() {
    this.itemsInCart++;
    console.log('Item added to cart');
  }


  
 
  getCartCount(): number {
    this.cartCount = this.cartService.getCartCount();
    console.log(this.cartCount+"cartcount.........");
    
    return this.cartCount;
  }


}
