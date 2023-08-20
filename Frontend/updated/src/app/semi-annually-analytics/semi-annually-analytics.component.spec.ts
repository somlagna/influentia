

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SemiAnnuallyAnalyticsComponent } from './semi-annually-analytics.component';
import { SemiAnnuallyAnalyticsServiceService } from '../semi-annually-analytics-service.service';
import { HttpClient } from '@angular/common/http';

describe('QuaterlyAnalyticsComponent', () => {
  let component: SemiAnnuallyAnalyticsComponent;
  let fixture: ComponentFixture<SemiAnnuallyAnalyticsComponent>;
  let activatedRoute: ActivatedRoute;
  let quaterlyAnalyticsService: SemiAnnuallyAnalyticsServiceService;

  beforeEach(() => {
    activatedRoute = {
      params: of({ year: '2023', username: 'example' })
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [SemiAnnuallyAnalyticsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        SemiAnnuallyAnalyticsServiceService
      ],
      imports: [HttpClientTestingModule] // Import the HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(SemiAnnuallyAnalyticsComponent);
    component = fixture.componentInstance;

    // Get the instance of the QuaterlyAnalyticsServiceService from the TestBed
    quaterlyAnalyticsService = TestBed.inject(SemiAnnuallyAnalyticsServiceService);

    spyOn(quaterlyAnalyticsService, 'getPostAnalyticsData').and.returnValue(of([
      { postype: 'Type 1', socialaccounttype: 'Account 1', count: 10 },
      { postype: 'Type 2', socialaccounttype: 'Account 2', count: 5 },
      { postype: 'Type 1', socialaccounttype: 'Account 2', count: 8 },
    ]))
    

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve analytics data from the service', () => {
    expect(quaterlyAnalyticsService.getPostAnalyticsData).toHaveBeenCalledWith( 2023,'example');
    expect(component.analyticsData).toEqual([
      { postype: 'Type 1', socialaccounttype: 'Account 1', count: 10 },
      { postype: 'Type 2', socialaccounttype: 'Account 2', count: 5 },
      { postype: 'Type 1', socialaccounttype: 'Account 2', count: 8 },
    ]);
  });
 
});
