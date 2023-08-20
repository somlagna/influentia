import { TestBed } from '@angular/core/testing';

import { CreateUserPostServiceService } from './create-user-post-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CreateUserPostServiceService', () => {
  let service: CreateUserPostServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], 
      providers: [CreateUserPostServiceService]});
    service = TestBed.inject(CreateUserPostServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should send a POST request with the provided form data', () => {
    const formData = {
      postedon: '2023-07-15',
      publishondate: '2023-07-16',
      publishontime: '12:00 PM',
      posttype: 'Text',
      postcontexttext: 'Hello, world!',
      postattachmenturl: 'http://example.com/image.png',
      poststatus: 'Draft',
      userName: 'JohnDoe',
      socialnetworktype: 'Twitter',
      isScheduled: '0',
      image: new File([], 'test-image.png'), // Replace with an actual file or create a test file
    };

    const expectedFormDataKeys = [
      'postedon',
      'publishondate',
      'publishontime',
      'posttype',
      'postcontexttext',
      'postattachmenturl',
      'poststatus',
      'userName',
      'socialnetworktype',
      'isScheduled',
      'image',
    ];

    const expectedFormData = new FormData();
    expectedFormData.append('postedon', formData.postedon);
    expectedFormData.append('publishondate', formData.publishondate);
    expectedFormData.append('publishontime', formData.publishontime);
    expectedFormData.append('posttype', formData.posttype);
    expectedFormData.append('postcontexttext', formData.postcontexttext);
    expectedFormData.append('postattachmenturl', formData.postattachmenturl);
    expectedFormData.append('poststatus', formData.poststatus);
    expectedFormData.append('userName', formData.userName);
    expectedFormData.append('socialnetworktype', formData.socialnetworktype);
    expectedFormData.append('isScheduled', formData.isScheduled);
    expectedFormData.append('image', formData.image);

    service.submitForm(formData).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/content/add');
    expect(req.request.method).toBe('POST');

    const reqFormData: { [key: string]: string | Blob | boolean } = {};

    for (const key of expectedFormDataKeys) {
      const value = expectedFormData.get(key);
      reqFormData[key] = value as string | Blob | boolean;
    }

    expect(reqFormData['postedon']).toEqual(formData.postedon);
    expect(reqFormData['publishondate']).toEqual(formData.publishondate);
    expect(reqFormData['publishontime']).toEqual(formData.publishontime);
    expect(reqFormData['posttype']).toEqual(formData.posttype);
    expect(reqFormData['postcontexttext']).toEqual(formData.postcontexttext);
    expect(reqFormData['postattachmenturl']).toEqual(formData.postattachmenturl);
    expect(reqFormData['poststatus']).toEqual(formData.poststatus);
    expect(reqFormData['userName']).toEqual(formData.userName);
    expect(reqFormData['socialnetworktype']).toEqual(formData.socialnetworktype);
    expect(reqFormData['isScheduled']).toEqual(formData.isScheduled);
    expect(reqFormData['image']).toEqual(formData.image);
  });


});
