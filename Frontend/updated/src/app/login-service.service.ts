import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl='http://localhost:9191/api/content';
  constructor(private http:HttpClient) { }
  user!:user;
  getPostAnalyticsData(obj:user){
    
    const url=`${this.apiUrl}/login`;
    console.log(url);
    return this.http.post(url,obj,{responseType:'text'});
  }
}
