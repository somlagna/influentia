import { TestBed } from '@angular/core/testing';

import { UserPostsListService } from './user-posts-list_service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserPostsListService', () => {
  let service: UserPostsListService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], 
      providers: [UserPostsListService]});
    service = TestBed.inject(UserPostsListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should send a PUT request to cancel a post', () => {
    const postId = 123;
    const userName = 'soma';
    const apiUrl = 'http://localhost:8080/api/content';
    const expectedUrl = `${apiUrl}/${userName}/cancel/${postId}`;

    service.cancelPost(postId).subscribe();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});

    req.flush({});
  });
});
