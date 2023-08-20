import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {
  private apiUrl='http://localhost:9191/api/content';
  constructor(private http:HttpClient) { }
  
  submitForm(formData:any){
    
   
    const url=`${this.apiUrl}/registration`;
    return this.http.post(url,formData);
    //return this.http.post(url,formData);
  }
}
