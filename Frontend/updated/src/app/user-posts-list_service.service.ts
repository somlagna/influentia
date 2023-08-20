import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UserPosts} from './user-posts'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserPostsListService {
  private apiUrl='http://localhost:9191/api/content';
  constructor(private http:HttpClient) { }
  getPostsByUserName(userName:string):Observable<UserPosts[]>{
    const url=`${this.apiUrl}/${userName}`;
    return this.http.get<UserPosts[]>(url);
  }
  cancelPost(postId:number){
    const userName=localStorage.getItem('username')||'';
    const url=`${this.apiUrl}/${userName}/cancel/${postId}`;
    return this.http.put(url,{});
  }
}
