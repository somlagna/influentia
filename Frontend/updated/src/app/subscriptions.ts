import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class subscriptions{
    private apiUrl='http://localhost:9191/api/content/allplans';
    constructor(private http:HttpClient) { }
    getSubscriptions(userName:string){
        const url=`${this.apiUrl}/${userName}`;
        return this.http.get(url,{responseType:'text'});
    }
  
}