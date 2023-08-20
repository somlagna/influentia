import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SemiAnnuallyAnalyticsServiceService {
  private apiUrl='http://localhost:9191/api/content';
  constructor(private http:HttpClient) { }
  getPostAnalyticsData(year:number,username:string){
    
    const url=`${this.apiUrl}/analytics/semiannually/${year}/${username}`;
    console.log(url);
    return this.http.get<any[]>(url);
  }
}
