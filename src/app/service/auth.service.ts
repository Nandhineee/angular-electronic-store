import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT, urlEndpoint } from '../utils/constant';
import { Login } from '../model/login';
import { BehaviorSubject, Observable, Observer, map } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
//   private isAdminSubject = new BehaviorSubject<boolean>(false);
//   private isLoggedInSubject = new BehaviorSubject<boolean>(false);

//   isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
//   isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     private storageService: StorageService
//   ) {
//     if (storageService.getLoggedInUser().id != null) {
//       this.setLoggedIn(storageService.getLoggedInUser());
//     }
//   }

//  login(login: Login): Observable<AppResponse> {
//     return this.http
//       .post<AppResponse>(`${urlEndpoint.baseUrl}/auth/login`, login)
//       .pipe(
//         map((user) => {
//           this.storageService.setAuthData(
//             window.btoa(login.username + ":" + login.password)
//           );
//           return user;
//         })
//       );
//   }

//   logout() {
//     this.storageService.removeAuthData();
//     this.isAdminSubject.next(false);
//     this.isLoggedInSubject.next(false);
//     this.storageService.removeLoggedInUser();
//     this.storageService.removeRoute();
//     this.router.navigate(["/login"], { replaceUrl: true });
//   }

//   isAdmin(): boolean {
//     return this.isAdminSubject.value;
//   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInSubject.value;
//   }

//   setLoggedIn(user: AppUser): void {
//     this.storageService.setLoggedInUser(user);
//     this.isLoggedInSubject.next(true);

//     let route: string | null = this.storageService.getRoute();
//     if (user.role === CONSTANT.USER) {
//       if (route === null) route = "";
//       this.router.navigate(["/" + route], { replaceUrl: true });
//     } else if (user.role === CONSTANT.ADMIN) {
//       if (route === null) route = "adminproduct";
//       this.isAdminSubject.next(true);
//       this.router.navigate(["/" + route], { replaceUrl: true });
//     }
//   }
private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private loggedInUser: AppUser | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    if (storageService.getLoggedInUser().id != null) {
      this.setLoggedIn(storageService.getLoggedInUser());
    }
  }

  login(login: Login): Observable<AppResponse> {
    return this.http
      .post<AppResponse>(`${urlEndpoint.baseUrl}/auth/login`, login)
      .pipe(
        map((user) => {
          this.storageService.setAuthData(
            window.btoa(login.username + ':' + login.password)
          );
          return user;
        })
      );
  }

  logout() {
    this.storageService.removeAuthData();
    this.isAdminSubject.next(false);
    this.isLoggedInSubject.next(false);
    this.storageService.removeLoggedInUser();
    this.router.navigate(['/'], { replaceUrl: true });
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  

  setLoggedIn(user: AppUser): void {
    this.loggedInUser = user;
    this.storageService.setLoggedInUser(user);

    this.storageService.setLoggedInUser(user);
    this.isLoggedInSubject.next(true);

  

    let route:string | null=this.storageService.getRoute();
    if (user.role === CONSTANT.USER) {
      if(route===null) route="/home";
      this.router.navigate(["/" + route], { replaceUrl: true });
    } else if (user.role === CONSTANT.ADMIN) {
      if(route===null) route= "/dashboard";
      this.isAdminSubject.next(true);
      this.router.navigate(["/" + route], { replaceUrl: true });
    }
  }
  getLoggedInUser(): AppUser | null {
    return this.loggedInUser;
  }
 
  isUserLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

}
