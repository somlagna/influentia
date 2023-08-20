import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import { user } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router,private loginServiceService:LoginServiceService){}
  onNavigationBar(){
    this.router.navigate(['navigation'])
  }
  user=new user();
  formData:any={};
  onChange(formData:any){
    if(!formData.email||!formData.password){
      window.alert("Please fill all the field");
      return;
    }
    this.user.emailId=formData.email;
    this.user.password=formData.password;
    console.log(this.user);
    
    this.loginServiceService.getPostAnalyticsData(this.user).subscribe(
      (response)=>{
        console.log(response);
        localStorage.setItem('username',response);
        alert("Logged In");
        this.router.navigate(['navigation']);
      },
      (error)=>{
        if(error.error==='User does not exist'){
          alert("user does not exist");
        }
       
        if(error.error==='Password Incorrect'){
          alert("Password Incorrect");
        }
      }
    )
    
    // console.log(formData.password);
  }
}
