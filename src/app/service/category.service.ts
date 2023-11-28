import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http:HttpClient) { }

  getcategories():Observable<AppResponse>{
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/category/all`
    );
  }

  postcategory(category:Category):Observable<AppResponse>{
    return this.http.post<AppResponse>(
    `${urlEndpoint.baseUrl}/admin/category`,category
    );
  }

  deletecategory(id:number):Observable<AppResponse>{
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/category${id}`
    )
  }

}