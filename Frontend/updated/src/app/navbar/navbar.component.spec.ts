import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { PostComponent } from '../post/post.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [    
        RouterTestingModule ,
           
      ],
      declarations: [NavbarComponent,PostComponent]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set dialogVisible to true when openDialog() is called', () => {
    // Act
    component.openDialog();
  
    // Assert
    expect(component.dialogVisible).toBeTrue();
  });
  it('should navigate to UserPostListComponent and close the dialog', () => {
    // Arrange
    const username = 'JohnDoe';
    spyOn(console, 'log');
    component.dialogVisible = true;

    // Act
    component.navigateToUserPostList(username);

    // Assert
    expect(console.log).toHaveBeenCalledWith(`Navigating to post list of user: ${username}`);
    expect(component.dialogVisible).toBeFalse();
  });
  
});
