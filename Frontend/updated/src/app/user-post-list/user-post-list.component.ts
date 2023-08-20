import { Component, OnInit } from '@angular/core';
import {UserPosts} from '../user-posts'

import {UserPostsListService} from '../user-posts-list_service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css']
})
export class UserPostListComponent implements OnInit{
  userPosts: UserPosts[] = [];
  isLoading: boolean | undefined;
  username!:string;
  http: any;
  filteredStatus!: '';
  filteredPostStatus='';
  constructor(private router:Router,private route:ActivatedRoute,private UserPostsListService: UserPostsListService){}
 
  ngOnInit():void{
    this.username=localStorage.getItem('username')||'';
    // this.route.params.subscribe(params=>{
    //   this.username=params['username']
    // })
    console.log(this.username);
    console.log(localStorage.getItem('username'));
  
   this.UserPostsListService.getPostsByUserName(this.username).subscribe((userPosts:UserPosts[])=>{
    this.userPosts=userPosts;
    
    
   })
   
  }
  getImageUrl(imageName:string):string{
    return 'http://localhost:8080/api/content/getImages/'+imageName.substring(8);
  }
  getVideoUrl(videoName:string):string{
    return 'http://localhost:8080/api/content/'+videoName.substring(7)+'/stream';
  }
  isVisible: boolean = true;
  postCancelled: boolean = false;
  removeButtonVisible: boolean = false;
  toggleCardVisibility() {
    this.isVisible = !this.isVisible;
  }
  isCancel(userPost:UserPosts):boolean{
    
      const today: Date = new Date();
      console.log(today);
      const publish:Date=this.getOneDayDate(userPost.publishondate);
      console.log(publish);
      
      return userPost.poststatus=='Scheduled' && today<publish;
  }
  cancelPost(postId:number){
    if(window.confirm('Are you sure you want to cancel?')){
    this.UserPostsListService.cancelPost(postId).subscribe(()=>{
      console.log("post ${postId} is cancelled");
      const postIndex=this.userPosts.findIndex(userPost=>userPost.id===postId);
      if(postIndex!==-1){
        this.userPosts[postIndex].poststatus='Cancelled';
      }
      this.postCancelled = true;
      this.removeButtonVisible=true;
    })
    
  }
  }
  getOneDayDate(date:Date){
    
    // const oneDay=((5*60)+30)*60*1000;
    // const nextDay=new Date(new Date(date).getMilliseconds()+oneDay);
    // return nextDay;
    const nextDay=new Date(date);
    const oneDay=((24*60))*60*1000;
    return new Date(nextDay.getTime()+oneDay);
  }

  onNavigationBar(){
    this.router.navigate(['navigation']);
  }
  
}
