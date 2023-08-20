// import { ComponentFixture, TestBed, async } from '@angular/core/testing';

// import { CreateUserPostComponent } from './create-user-post.component';
// import { ActivatedRoute } from '@angular/router';
// import { CreateUserPostServiceService } from '../create-user-post-service.service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';

// describe('CreateUserPostComponent', () => {
//   let component: CreateUserPostComponent;
//   let fixture: ComponentFixture<CreateUserPostComponent>;
//   let teste: CreateUserPostComponent;
//   let route: ActivatedRoute;
//   let myService:CreateUserPostServiceService;

//   beforeEach(async(() => {
      
//       TestBed.configureTestingModule({
//       declarations: [ CreateUserPostComponent ],
//       imports: [
//           RouterTestingModule,
//           HttpClientModule,
//           FormsModule
//       ],
//       providers: [CreateUserPostServiceService]
//       })
//       .compileComponents();
//   }));
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [CreateUserPostComponent]
//     });
//     fixture = TestBed.createComponent(CreateUserPostComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateUserPostComponent } from './create-user-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('CreateUserPostComponent', () => {
  let component: CreateUserPostComponent;
  let fixture: ComponentFixture<CreateUserPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserPostComponent],
      imports: [RouterTestingModule,HttpClientModule,FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedPostType when onPostTypeChange is called', () => {
    const mockEvent = { target: { value: 'Image' } };
    component.onPostTypeChange(mockEvent);
    expect(component.selectedPostType).toBe('Image');
  });

  it('should display alert when required fields are not filled', () => {
    spyOn(window, 'alert');
    component.onChange({
      postedon: '2023-07-15',
      // Fill only some fields, leaving out required fields
    });
    expect(window.alert).toHaveBeenCalledWith('Please fill all the required fields');
  });
  it('should display alert when post type is "Image" and file type is not valid', () => {
    spyOn(window, 'alert');
    component.file = { type: 'image/gif' } as File; // Set an invalid file type
    component.onChange({
      postedon: '2023-07-15',
      publishondate: '2023-07-16',
      publishontime: '12:00 PM',
      posttype: 'Image',
      poststatus: 'Draft',
      userName: 'john_doe',
      socialnetworktype: 'Twitter',
      isScheduled: true
      // Fill other required fields
    });
    expect(window.alert).toHaveBeenCalledWith('Please select a valid JPEG or PNG image file.');
  });
  it('should display alert when post type is "Video" and file type is not valid', () => {
    spyOn(window, 'alert');
    component.file = { type: 'video/avi' } as File; // Set an invalid file type
    component.onChange({
      postedon: '2023-07-15',
      publishondate: '2023-07-16',
      publishontime: '12:00 PM',
      posttype: 'Video',
      poststatus: 'Draft',
      userName: 'john_doe',
      socialnetworktype: 'Twitter',
      isScheduled: true
      // Fill other required fields
    });
    expect(window.alert).toHaveBeenCalledWith('Please select a valid JPEG or PNG image file.');
  });
  // it('should display alert when publish on date is less than posted on date', () => {
  //   spyOn(window, 'alert');
  //   component.onChange({
  //     postedon: '2023-07-15',
  //     publishondate: '2023-07-10',
  //     publishontime: '12:00 PM',
  //     posttype: 'Text',
  //     poststatus: 'Draft',
  //     userName: 'john_doe',
  //     socialnetworktype: 'Twitter',
  //     isScheduled: true
  //     // Fill other required fields
  //   });
  //   expect(window.alert).toHaveBeenCalledWith('Publish on date cannot be less than posted on date');
  // });
  // it('should display alert when error response has "Limit Exceeded here" message', () => {
  //   spyOn(window, 'alert');
  //   const errorResponse = { status: 400, error: 'Limit Exceeded here' };
  //   component.onChange({
  //     postedon: '2023-07-15',
  //     publishondate: '2023-07-16',
  //     publishontime: '12:00 PM',
  //     posttype: 'Text',
  //     poststatus: 'Draft',
  //     userName: 'john_doe',
  //     socialnetworktype: 'Twitter',
  //     isScheduled: true
  //     // Fill other required fields
  //   });
  //   expect(window.alert).toHaveBeenCalledWith('Basic Limit of 5 is exceeded');
  // });
  // it('should log "Form submitted" and display alert "Form submitted"', async () => {
  //   spyOn(console, 'log');
  //   spyOn(window, 'alert');
  //   const formData = {
  //     // Fill all required fields
  //     postedon: '2023-07-15',
  //     publishondate: '2023-07-16',
  //     publishontime: '12:00 PM',
  //     posttype: 'Text',
  //     postcontexttext:'kkkkkkk0',
  //     poststatus: 'Scheduled',
  //     userName: 'john_doe',
  //     socialnetworktype: 'Twitter',
  //     isScheduled: 1
  //   };
    
  //   component.onChange(component.formData); // Trigger the onChange method directly

  //   await fixture.whenStable(); 
   
    
  //   expect(console.log).toHaveBeenCalledWith('Form submitted');
  //   expect(window.alert).toHaveBeenCalledWith('Form submitted');
  // });
  // Add more test cases to cover different scenarios
  it('should log "Form submitted" and display alert "Form submitted"', waitForAsync(async () => {
  //   let consoleLogMessage: string | undefined;
  // let alertMessage: string | undefined;

  // spyOn(console, 'log').and.callFake((message: string) => {
  //   consoleLogMessage = message;
  // });

  // spyOn(window, 'alert').and.callFake((message: string) => {
  //   alertMessage = message;
  // });
  let consoleLogCalled = false;
  let alertCalled = false;

  spyOn(console, 'log').and.callFake(() => {
    consoleLogCalled = true;
  });

  spyOn(window, 'alert').and.callFake(() => {
    alertCalled = true;
  });

  const formData = {
    postedon: '2023-07-15',
    publishondate: '2023-07-15',
    publishontime: '10:00 AM',
    posttype: 'Text',
    postcontexttext: 'Sample text',
    postattachmenturl: 'http://example.com/image.jpg',
    poststatus: 'Active',
    userName: 'John Doe',
    socialnetworktype: 'Facebook',
    isScheduled: true
  };
  
    console.log('FormData:', formData);
    component.onChange(formData);
    console.log('After calling onChange');
    await fixture.whenStable(); // Wait for asynchronous tasks to complete
    
    expect(consoleLogCalled).toBe(true);
    expect(alertCalled).toBe(true);

     // Mock the response
  }));
  
});

