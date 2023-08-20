import { Component } from '@angular/core';
import { SemiAnnuallyAnalyticsServiceService } from '../semi-annually-analytics-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-semi-annually-analytics',
  templateUrl: './semi-annually-analytics.component.html',
  styleUrls: ['./semi-annually-analytics.component.css']
})
export class SemiAnnuallyAnalyticsComponent {
  year!:number;
  username!:string;
  analyticsData: any[] = [];
  socialAccountFilter:string='';
  postTypeFilter:string='';
  constructor(private route:ActivatedRoute,private semiAnnuallyAnalyticsServiceService:SemiAnnuallyAnalyticsServiceService){}
  ngOnInit():void{
    this.route.params.subscribe(params=>{
      this.year=+params['year'];
      this.username=params['username'];
    })
    console.log(this.analyticsData);
    this.semiAnnuallyAnalyticsServiceService.getPostAnalyticsData(this.year,this.username).subscribe(
      data=>{
        this.analyticsData=data;
        
      },
      (error)=>{
        console.log("error");
      }
    )
  }
}
