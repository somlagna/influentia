import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscriptions } from '../subscriptions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username:string=localStorage.getItem('username')||'';
  logout() {
    if (window.confirm('Are you sure you want to logout?')) {
    // Remove local storage data (You can adapt this to your specific storage structure)
    localStorage.clear();
    // Navigate to the home page (replace 'home' with the actual route/path of your home page)
    window.location.href = '/';
  }}
  plans:string='';
  constructor(private subscriptions:subscriptions){}
  ngOnInit():void{
    this.subscriptions.getSubscriptions(this.username).subscribe((data)=>{
      this.plans=data;
      console.log(this.plans);
    })
  }
}
