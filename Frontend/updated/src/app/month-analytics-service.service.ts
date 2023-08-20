import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthAnalyticsServiceService {
  private apiUrl='http://localhost:9191/api/content';
  constructor(private http:HttpClient) { }
  getPostAnalyticsData(username:string,year:number){
    
    const url=`${this.apiUrl}/analytics/monthly/${year}/${username}`;
    console.log(url);
    return this.http.get<any[]>(url);
  }
}
