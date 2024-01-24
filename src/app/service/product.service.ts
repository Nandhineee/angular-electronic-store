import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Product } from '../model/product';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts():Observable<AppResponse>{
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/gadget/all`
    );
  }

  

  deleteProduct(id:number):Observable<AppResponse>{
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/gadget/${id}`
    );
  }  
  
  postProduct(product:FormData):Observable<AppResponse>{
    console.log(product);
    
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/gadget/create`,product
    )

    
  }
 

  addToCart(userId: number, productId: number): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      gadgetId: productId,
    };
    console.log(requestData);
 
    return this.http.post<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }

  incrementAndDecrement(userId:number,productId:number,count:number):Observable<AppResponse>{
    const requestData = {
      userId: userId,
      gadgetId: productId,
      count:count
    };
    console.log(requestData);
 
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`, requestData);

  }
}  




