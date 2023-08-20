import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class YearlyAnalyticsServiceService {
  private apiUrl='http://localhost:9191/api/content';
  usrname!:string;
  year!:number;
  constructor(private route:ActivatedRoute,private http:HttpClient) { }
  
  getPostAnalyticsData(userName:string,uear:number){
    //const userName='tina';
    //const year=2023;
    const url=`${this.apiUrl}/analytics/yearly/${uear}/${userName}`;
    console.log(url);
    return this.http.get<any[]>(url);
  }
}
