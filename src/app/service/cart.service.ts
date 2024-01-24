import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Cart } from '../model/cart';
import { Address } from '../model/address';
import { StorageService } from './storage.service';
import { empty } from 'angular-pipes/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient,   
     private storageService: StorageService
    ) {}

  getCart(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }

  deleteCart(id: number, productId: number): Observable<Cart[]> {
    return this.http.delete<Cart[]>(
      `${urlEndpoint.baseUrl}/cart/${id}/${productId}`
    );
  }


  getCartCount() {
    let userId = this.storageService.getLoggedInUser();
    console.log(userId.username);
    let Arrcart=this.storageService.getCart();
    console.log(Arrcart);
    
    
    let cartArr = this.storageService
      .getCart()
      ?.filter((item: Cart) => item.userId === userId.id);
    console.log(userId.id);
    console.log(cartArr+"mmmm");
    if (cartArr) {
      let count: number;
      count = cartArr.reduce((a: number, c: Cart) => {
        if (c.userId === userId.id) {
          a += c.count;
        }
        return a;
      }, 0);
      return count;
    } else {
      return 0;
    }
  }
 
  cartCountUpdate(
    userId: number,
    productId: number,
    c: number,
    t: number ): Observable<Cart[]> {
    const requestData = {
      userId: userId,
      artWorkId: productId,
      count: c,
      total: t,
    };
    console.log(requestData);

    return this.http.put<Cart[]>(`${urlEndpoint.baseUrl}/cart`, requestData);
  }
}
