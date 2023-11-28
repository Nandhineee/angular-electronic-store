import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Product } from '../model/product';

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
  
  postProduct(product:Product):Observable<AppResponse>{
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/gadget`,product
    )
  }

  
}



