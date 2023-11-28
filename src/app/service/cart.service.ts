import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCart(userId:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/cart/${userId}`
    );
  }

  deleteCart(id: number, productId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/admin/artWork/${id}/${productId}`
    );
  }

}
