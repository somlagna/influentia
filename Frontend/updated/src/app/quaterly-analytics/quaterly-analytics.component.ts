import { Component } from '@angular/core';
import { QuaterlyAnalyticsServiceService } from '../quaterly-analytics-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quaterly-analytics',
  templateUrl: './quaterly-analytics.component.html',
  styleUrls: ['./quaterly-analytics.component.css']
})
export class QuaterlyAnalyticsComponent {
  year!:number;
  username!:string;
  analyticsData: any[] = [];
  socialAccountFilter:string='';
  postTypeFilter:string='';
  constructor(private route:ActivatedRoute,private quaterlyAnalyticsServiceService:QuaterlyAnalyticsServiceService){}
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.year=+params['year'];
      this.username=params['username'];
    })
    console.log(this.analyticsData);
    console.log(this.username);
    console.log(this.analyticsData);
    this.quaterlyAnalyticsServiceService.getPostAnalyticsData(this.username,this.year).subscribe(
      data=>{
        this.analyticsData=data;
        
      },
      (error)=>{
        console.log("error");
      }
    )
  }
}
