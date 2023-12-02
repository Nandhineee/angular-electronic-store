import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderDetails: Order[] = [];
  user: AppUser;
  selectedItem: string | null = '';
  totalValue: number = 0;
  carts: Cart[] = [];

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    this.user = storageService.getLoggedInUser();
  }

  ngOnInit(): void {
    this.orderService.fetchdata(this.user?.id).subscribe({
      next: (orders: any) => {

        this.orderDetails = orders.data;
        console.log("user oders",this.orderDetails);

      },
      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
    
  }
  currentStep: string = 'address';
  completedSteps: string[] = [];


}
