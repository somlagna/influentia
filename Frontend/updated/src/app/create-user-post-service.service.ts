import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CreateUserPostServiceService {
  private apiUrl='http://localhost:9191/api/content';
  constructor(private http:HttpClient) { }
  
  submitForm(formData:any){
    
   
    const url=`${this.apiUrl}/add`;
    return this.http.post(url,formData);
    //return this.http.post(url,formData);
  }
}
