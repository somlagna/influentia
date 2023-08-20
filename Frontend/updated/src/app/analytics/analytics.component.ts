import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
   year!: number;
  username:string=localStorage.getItem('username')||'';;
  
  showErrorUserName=false;
  showErrorYear=false;
  constructor(private route:ActivatedRoute,private router:Router){}
  
  
  goToYearlyAnalytics(){
    
    if (this.username && this.username.trim() !== ''&&this.year) {
      this.showErrorUserName = false;
      this.showErrorYear=false;
      console.log(this.year);
      this.router.navigate(['yearlyAnalytics',this.year,this.username]);}
      else if(!this.username && !this.year){
        this.showErrorUserName=true;
        this.showErrorYear=true;
      }
    else if(!this.username){
      this.showErrorUserName = true;
    }
    else if(!this.year){
      this.showErrorYear=true;
    }
    
    //replaceUrl:true
  }
  goToMonthlyAnalytics(){
    if (this.username && this.username.trim() !== ''&&this.year) {
      this.showErrorUserName = false;
      this.showErrorYear=false;
      console.log(this.year);
      this.router.navigate(['monthlyAnalytics',this.year,this.username]);}
      else if(!this.username && !this.year){
        this.showErrorUserName=true;
        this.showErrorYear=true;
      }
    else if(!this.username){
      this.showErrorUserName = true;
    }
    else if(!this.year){
      this.showErrorYear=true;
    }
    
    //replaceUrl:true
  }
  goToSemiAnnuallyAnalytics(){
    if (this.username && this.username.trim() !== ''&&this.year) {
      this.showErrorUserName = false;
      this.showErrorYear=false;
      console.log(this.year);
      this.router.navigate(['semiAnnuallyAnalytics',this.year,this.username]);}
      else if(!this.username && !this.year){
        this.showErrorUserName=true;
        this.showErrorYear=true;
      }
    else if(!this.username){
      this.showErrorUserName = true;
    }
    else if(!this.year){
      this.showErrorYear=true;
    }
    
    //replaceUrl:true
  }
  goToQuarterlyAnalytics(){
    if (this.username && this.username.trim() !== ''&&this.year) {
      this.showErrorUserName = false;
      this.showErrorYear=false;
      console.log(this.year);
      this.router.navigate(['quaterlyAnalytics',this.year,this.username]);}
      else if(!this.username && !this.year){
        this.showErrorUserName=true;
        this.showErrorYear=true;
      }
    else if(!this.username){
      this.showErrorUserName = true;
    }
    else if(!this.year){
      this.showErrorYear=true;
    }
    
    //replaceUrl:true
  }
}
