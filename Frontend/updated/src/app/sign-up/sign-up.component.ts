import { Component } from '@angular/core';
import { user } from '../user';
import { RegistrationServiceService } from '../registration-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private registrationServiceService:RegistrationServiceService,private router:Router){}
  formData:any={};
  user=new user();
  onChange(formData:any){
    this.user.emailId=formData.email;
    this.user.password=formData.password;
    this.user.userName=formData.name;
    console.log(this.user);
    if(!this.user.emailId|| !this.user.password || !this.user.userName){
      window.alert("Please fill all the required fields");
        return;
    }
    this.registrationServiceService.submitForm(this.user).subscribe(
      ()=>{
        alert("Registered");
        this.router.navigate(['login']);
      },
      (error)=>{
        alert("User already exists");
        window.location.href = '/login';
      }
    )
    
  }
}
