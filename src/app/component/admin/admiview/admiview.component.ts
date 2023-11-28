import { Component } from '@angular/core';
import { UserDetails } from 'src/app/model/user-details';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admiview',
  templateUrl: './admiview.component.html',
  styleUrls: ['./admiview.component.css']
})
export class AdmiviewComponent {
  userDetails: UserDetails[] = [];
  error:string="";
  userDetail:UserDetails={
    id: 0,
    username: "",
    name: "",
    role: "",
    joinedAt: "",
    addressList: [],

    
  };

  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.getusers().subscribe({
      next:(response:any)=>{
        console.log(response);
        let userDetails: UserDetails[] =response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
          this.userDetail = userDetails[0];
        }

        this.userDetails=userDetails;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },

    })

    }
    setSelectedUser(userDetail: UserDetails): void {
      this.userDetail = userDetail;
    }
  }
  

