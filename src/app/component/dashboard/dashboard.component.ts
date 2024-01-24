import { Component } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalUsers = 0;
  totalGadgets = 0;

  constructor(
    private userService: UserService,
    private productService:ProductService

  ){ }

  
  ngOnInit(): void {
    this.userService.getusers().subscribe({
      next: (response: any) => {
        let users: AppUser[] = response.data;
        this.totalUsers = users.length;
      },
      error: (err) => {
        console.error('Error loading total users:', err);
      },
    });
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        let gadget: Product[] = response.data;
        this.totalGadgets = gadget.length;
      },
      error: (err) => {
        console.error('Error loading total cloths:', err);
      },
    });
  }


}
