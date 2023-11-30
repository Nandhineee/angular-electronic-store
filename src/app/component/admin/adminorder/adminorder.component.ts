import { Component } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-adminorder',
  templateUrl: './adminorder.component.html',
  styleUrls: ['./adminorder.component.css']
})
export class AdminorderComponent {
  orderDetails: Order[] = [];
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.orderService.getAllOrderDetails().subscribe({
      next: (order: any) => {
        let orderDetail:Order[] = order.data;
        console.log(order);

        this.orderDetails = orderDetail
        // this.productDetail = productDetails[0];
      },

      error: () => console.log('error'),
      complete: () => console.log('completed'),
    });
  }

}
