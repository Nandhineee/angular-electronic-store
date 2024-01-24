import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { AppUser } from '../model/appUser';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getusers():Observable<AppResponse>{
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/user/all`
    );
  }

  
 postAddress(address:Address):Observable<AppResponse>{
  console.log(address);
  
  return this.http.post<AppResponse>(
  `${urlEndpoint.baseUrl}/user/address`,address
  );

}
getAllAddress(userId: number): Observable<AppResponse> {
  return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/user/${userId}`);
}




deleteAddress(id: number): Observable<AppResponse> {
  return this.http.delete<AppResponse>(
    `${urlEndpoint.baseUrl}/user/address/${id}`
  );
}


}
