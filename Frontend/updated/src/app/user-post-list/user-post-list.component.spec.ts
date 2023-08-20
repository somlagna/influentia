// import { ComponentFixture, TestBed, async } from '@angular/core/testing';

// import { UserPostListComponent } from './user-post-list.component';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserPostsListService } from '../user-posts-list_service.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientModule } from '@angular/common/http';

// describe('UserPostListComponent', () => {
//   let component: UserPostListComponent;
//   let fixture: ComponentFixture<UserPostListComponent>;
//   let teste: UserPostListComponent;
//     let route: ActivatedRoute;
//     let myService:UserPostsListService;
// let router:Router;
//     beforeEach(async(() => {
//         teste = new UserPostListComponent(router,route, myService);
//         TestBed.configureTestingModule({
//         declarations: [ UserPostListComponent ],
//         imports: [
//             RouterTestingModule,
//             HttpClientModule
//         ],
//         providers: [UserPostsListService]
//         })
//         .compileComponents();
//     }));
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [UserPostListComponent]
//     });
//     fixture = TestBed.createComponent(UserPostListComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserPostListComponent } from './user-post-list.component';
import { UserPostsListService } from '../user-posts-list_service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserPosts } from '../user-posts';
import { Router } from '@angular/router';

describe('UserPostListComponent', () => {
  let component: UserPostListComponent;
  let fixture: ComponentFixture<UserPostListComponent>;
  let userPostsListService: UserPostsListService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [UserPostListComponent],
      providers: [UserPostsListService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostListComponent);
    component = fixture.componentInstance;
    userPostsListService = TestBed.inject(UserPostsListService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should retrieve user posts', () => {
    type Time = string;
    const timeString: string = '12:00 PM';
const time: Time = timeString;
    const mockUserPosts :UserPosts[]= [
      
    ];
    spyOn(userPostsListService, 'getPostsByUserName').and.returnValue(of(mockUserPosts));

    component.ngOnInit();

    expect(userPostsListService.getPostsByUserName).toHaveBeenCalled();
    expect(component.userPosts).toEqual(mockUserPosts);
  });

  it('should get image URL', () => {
    const imageName = 'uuuuuuuuimage.png';
    const expectedUrl = 'http://localhost:8080/api/content/getImages/image.png';

    const imageUrl = component.getImageUrl(imageName);

    expect(imageUrl).toBe(expectedUrl);
  });

  it('should get video URL', () => {
    const videoName = 'uuuuuuuvideo.mp4';
    const expectedUrl = 'http://localhost:8080/api/content/video.mp4/stream';

    const videoUrl = component.getVideoUrl(videoName);

    expect(videoUrl).toBe(expectedUrl);
  });

  it('should return true if post is cancellable', () => {
    const userPost :UserPosts= {
      publishondate: new Date('2023-07-16'),
      poststatus: 'Scheduled',
      id: 0,
      postedon: new Date('2023-06-10'),
      publishontime: {
        hours: 0,
        minutes: 0
      },
      posttype: '',
      postcontexttext: '',
      postattachmenturl: '',
      userName: '',
      socialnetworktype: '',
      isScheduled: 0
    };

    spyOn(component, 'getOneDayDate').and.returnValue(new Date('2023-07-16'));

    const isCancellable = component.isCancel(userPost);

    expect(isCancellable).toBe(true);
  });

  it('should return false if post is not cancellable', () => {
    const userPost:UserPosts = {
      publishondate: new Date('2023-07-13'),
      poststatus: 'Scheduled',
      id: 0,
      postedon: new Date('2023-06-20'),
      publishontime: {
        hours: 0,
        minutes: 0
      },
      posttype: '',
      postcontexttext: '',
      postattachmenturl: '',
      userName: '',
      socialnetworktype: '',
      isScheduled: 0
    };

    spyOn(component, 'getOneDayDate').and.returnValue(new Date('2023-07-14'));

    const isCancellable = component.isCancel(userPost);

    expect(isCancellable).toBe(false);
  });

  it('should cancel a post', () => {
    const postId = 1;
    const userPost:UserPosts = {
      publishondate: new Date('2023-07-13'),
      poststatus: 'Scheduled',
      id: postId,
      postedon: new Date('2023-06-20'),
      publishontime: {
        hours: 0,
        minutes: 0
      },
      posttype: '',
      postcontexttext: '',
      postattachmenturl: '',
      userName: '',
      socialnetworktype: '',
      isScheduled: 0
    };
    
    spyOn(userPostsListService, 'cancelPost').and.returnValue(of(true));
    spyOn(window, 'confirm').and.returnValue(true);

    component.userPosts.push(userPost);
    component.cancelPost(postId);

    expect(userPostsListService.cancelPost).toHaveBeenCalledWith(postId);
    expect(component.userPosts[0].poststatus).toBe('Cancelled');
  });

  it('should not cancel a post if user cancels the confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(userPostsListService, 'cancelPost');

    const postId = 1;
    const userPost:UserPosts = {
      id: postId, poststatus: 'Scheduled',
      postedon: new Date('2023-06-20'),
      publishondate: new Date('2023-07-19'),
      publishontime: {
        hours: 0,
        minutes: 0
      },
      posttype: '',
      postcontexttext: '',
      postattachmenturl: '',
      userName: '',
      socialnetworktype: '',
      isScheduled: 0
    };
    component.userPosts = [userPost];

    component.cancelPost(postId);

    expect(window.confirm).toHaveBeenCalled();
    expect(userPostsListService.cancelPost).not.toHaveBeenCalled();
    expect(userPost.poststatus).toBe('Scheduled');
  });

  it('should get the next day date', () => {
    const inputDate = new Date('2023-07-15');
    const expectedDate = new Date('2023-07-16');

    const nextDay = component.getOneDayDate(inputDate);

    expect(nextDay).toEqual(expectedDate);
  });

  it('should navigate on navigation bar click', () => {
    spyOn(router, 'navigate');

    component.onNavigationBar();

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
