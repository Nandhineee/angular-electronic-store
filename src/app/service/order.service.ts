import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  fetchdata(userId:number): Observable<Order[]> {
    
    return this.http.get<Order[]>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }

  getAllOrderDetails(): Observable<Order[]> {
    return this.http.get<Order[]>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }


  
  createOrder(userId:number,id:number,addressId:number):Observable<Order[]>{
    let orderdata={
      userId:userId,
      addressId:1
    }
    console.log("changes userid and addressid");
    
    return this.http.post<Order[]>(`${urlEndpoint.baseUrl}/order`,orderdata)
  }
  setStatus(orderId: number, statusId: number): Observable<AppResponse> {
    const setStatus = {
      orderId: orderId,
      statusId: statusId,
    };
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/order/status`,
      setStatus
    );
  }


}
