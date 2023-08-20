import { Component } from '@angular/core';
import { MonthAnalyticsServiceService } from '../month-analytics-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monthly-analytics',
  templateUrl: './monthly-analytics.component.html',
  styleUrls: ['./monthly-analytics.component.css']
})
export class MonthlyAnalyticsComponent {
  year!:number;
  username!:string;
  analyticsData: any[] = [];
  socialAccountFilter:string='';
  postTypeFilter:string='';
  monthFilter: string='';
  constructor(private route:ActivatedRoute,private monthAnalyticsServiceService:MonthAnalyticsServiceService ){}
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.year=+params['year'];
      this.username=params['username'];
    })
    console.log(this.analyticsData);
    this.monthAnalyticsServiceService.getPostAnalyticsData(this.username,this.year).subscribe(
      data=>{
        this.analyticsData=data;
        
      },
      (error)=>{
        console.log("error");
      }
    )
  }
}
