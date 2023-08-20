import { Component } from '@angular/core';
import { YearlyAnalyticsServiceService } from '../yearly-analytics-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-yearly-analytics',
  templateUrl: './yearly-analytics.component.html',
  styleUrls: ['./yearly-analytics.component.css']
})
export class YearlyAnalyticsComponent {
  year!:number;
  username!:string;
  analyticsData: any[] = [];
  postTypeFilter: string = '';
  socialAccountFilter: string = '';
  constructor(private route:ActivatedRoute,private yearlyAnalyticsServiceService:YearlyAnalyticsServiceService){}
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.year=+params['year'];
      this.username=params['username'];
    })
    console.log(this.analyticsData);
    console.log(this.username);
    this.yearlyAnalyticsServiceService.getPostAnalyticsData(this.username,this.year).subscribe(
      data=>{
        this.analyticsData=data;
        
      },
      (error)=>{
        console.log("error");
      }
    )
  }
}
