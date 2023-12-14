import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterService } from 'src/app/service/register.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   options: AnimationOptions = {
    path: '/assets/auth.json',
   };
  //  error: string = '';

  //  constructor(
  //    private storage: StorageService,
  //    private authService: AuthService,
  //    private router: Router,
  //    private registerService: RegisterService
  //  ) {}
  //  onSubmit(registerForm: NgForm) {
  //    let formValue: Register = registerForm.value;
  //    console.log(formValue);
  //    console.log("registered");
     
 
  //    this.registerService.register(formValue).subscribe({
  //      next: (response: AppResponse) => {
  //         console.log(response.data);
  //        // registerForm.resetForm();
         
  //        this.router.navigate(['/login']);
  //      },
  //      complete: () => {},
  //      error: (error: Error) => {
  //        console.log('Message:', error.message);
  //        console.log('Name:', error.name);
  //      },
  //    });
  //  }
  constructor(private registerService: RegisterService, private router: Router) {}
  confirmPassword: string = '';
  error: string = ''; 
  user: Register = {
    name: '',
    username: '',
    password: '',
  };
 
  onSubmit(registerForm: NgForm) {
    console.log(registerForm.value);
    
    this.registerService.register(registerForm.value).subscribe({
      next: (_response: AppResponse) => {},
      error: (err: { error: { error: { message: string } } }) => {
        console.log(err);
        let message: string = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
      complete: () => {
        console.log('There are no more action happen.'),
          this.router.navigate(['/login'], { replaceUrl: true });
      },
    });
  }
 
  register(_registerForm:NgForm): void {
    let user: Register = {
      name: this.user.name,
      password: this.user.password,
      username: this.user.username,
    };
 
   
  }
 

  }

 

