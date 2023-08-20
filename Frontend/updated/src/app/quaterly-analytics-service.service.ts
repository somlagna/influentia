import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuaterlyAnalyticsServiceService {
  private apiUrl='http://localhost:9191/api/content';
  static getPostAnalyticsData: any;
  constructor(private http:HttpClient) { }
  getPostAnalyticsData(userName:string,year:number){
    
    const url=`${this.apiUrl}/analytics/quaterly/${year}/${userName}`;
    console.log(url);
    return this.http.get<any[]>(url);
  }
}
