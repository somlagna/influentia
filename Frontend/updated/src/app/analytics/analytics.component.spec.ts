import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AnalyticsComponent } from './analytics.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let teste: AnalyticsComponent;
    let route: ActivatedRoute;
    let myService: Router;
    let router: Router;
    beforeEach(async(() => {
        teste = new AnalyticsComponent(route, myService);
        
        TestBed.configureTestingModule({
        declarations: [ AnalyticsComponent ],
        imports: [
            RouterTestingModule,
            HttpClientModule,
            FormsModule
        ],
      
        })
        .compileComponents();
    }));
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsComponent]
    });
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to yearly analytics with correct parameters', () => {
    // Arrange
    const year = 2023;
    const username = 'JohnDoe';
    component.username = username;
    component.year = year;
    spyOn(router, 'navigate');

    // Act
    component.goToYearlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['yearlyAnalytics', year, username]);
  });
  it('should set showErrorUserName and showErrorYear to true when username and year are not provided', () => {
    // Arrange
    component.username = '';
    component.year = 0;

    // Act
    component.goToYearlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeTrue();
  });

  it('should set showErrorUserName to true when username is not provided', () => {
    // Arrange
    component.username = '';
    component.year = 2023;

    // Act
    component.goToYearlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeFalse();
  });

  it('should set showErrorYear to true when year is not provided', () => {
    // Arrange
    component.username = 'JohnDoe';
    component.year = 0;

    // Act
    component.goToYearlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeTrue();
  });
  it('should navigate to monthly analytics with correct parameters', () => {
    // Arrange
    const year = 2023;
    const username = 'JohnDoe';
    component.username = username;
    component.year = year;
    spyOn(router, 'navigate');

    // Act
    component.goToMonthlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['monthlyAnalytics', year, username]);
  });
  it('should set showErrorUserName and showErrorYear to true when username and year are not provided for monthly', () => {
    // Arrange
    component.username = '';
    component.year = 0;

    // Act
    component.goToMonthlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeTrue();
  });

  it('should set showErrorUserName to true when username is not provided for monthly', () => {
    // Arrange
    component.username = '';
    component.year = 2023;

    // Act
    component.goToMonthlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeFalse();
  });

  it('should set showErrorYear to true when year is not provided for monthly', () => {
    // Arrange
    component.username = 'JohnDoe';
    component.year = 0;

    // Act
    component.goToMonthlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeTrue();
  });
  //semi
  it('should navigate to semi annually analytics with correct parameters', () => {
    // Arrange
    const year = 2023;
    const username = 'JohnDoe';
    component.username = username;
    component.year = year;
    spyOn(router, 'navigate');

    // Act
    component.goToSemiAnnuallyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['semiAnnuallyAnalytics', year, username]);
  });
  it('should set showErrorUserName and showErrorYear to true when username and year are not provided for semi annually', () => {
    // Arrange
    component.username = '';
    component.year = 0;

    // Act
    component.goToSemiAnnuallyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeTrue();
  });

  it('should set showErrorUserName to true when username is not provided for semi annually', () => {
    // Arrange
    component.username = '';
    component.year = 2023;

    // Act
    component.goToSemiAnnuallyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeFalse();
  });

  it('should set showErrorYear to true when year is not provided for semi annually', () => {
    // Arrange
    component.username = 'JohnDoe';
    component.year = 0;

    // Act
    component.goToSemiAnnuallyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeTrue();
  });
  //quaterly
  it('should navigate to quaterly analytics with correct parameters', () => {
    // Arrange
    const year = 2023;
    const username = 'JohnDoe';
    component.username = username;
    component.year = year;
    spyOn(router, 'navigate');

    // Act
    component.goToQuarterlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['quaterlyAnalytics', year, username]);
  });
  it('should set showErrorUserName and showErrorYear to true when username and year are not provided for quarterly', () => {
    // Arrange
    component.username = '';
    component.year = 0;

    // Act
    component.goToQuarterlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeTrue();
  });

  it('should set showErrorUserName to true when username is not provided for quaterly', () => {
    // Arrange
    component.username = '';
    component.year = 2023;

    // Act
    component.goToQuarterlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeTrue();
    expect(component.showErrorYear).toBeFalse();
  });

  it('should set showErrorYear to true when year is not provided for quaterly', () => {
    // Arrange
    component.username = 'JohnDoe';
    component.year = 0;

    // Act
    component.goToQuarterlyAnalytics();

    // Assert
    expect(component.showErrorUserName).toBeFalse();
    expect(component.showErrorYear).toBeTrue();
  });
});
