import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MonthlyAnalyticsComponent } from './monthly-analytics.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MonthAnalyticsServiceService } from '../month-analytics-service.service';

describe('QuaterlyAnalyticsComponent', () => {
  let component: MonthlyAnalyticsComponent;
  let fixture: ComponentFixture<MonthlyAnalyticsComponent>;
  let activatedRoute: ActivatedRoute;
  let quaterlyAnalyticsService:  MonthAnalyticsServiceService;

  beforeEach(() => {
    activatedRoute = {
      params: of({ year: '2023', username: 'example' })
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [MonthlyAnalyticsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        MonthAnalyticsServiceService
      ],
      imports: [HttpClientTestingModule] // Import the HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyAnalyticsComponent);
    component = fixture.componentInstance;

    // Get the instance of the QuaterlyAnalyticsServiceService from the TestBed
    quaterlyAnalyticsService = TestBed.inject(MonthAnalyticsServiceService);

    spyOn(quaterlyAnalyticsService, 'getPostAnalyticsData').and.returnValue(of([
      { month:2,postype: 'Type 1', socialaccounttype: 'Account 1', count: 10 },
      ]))
    

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve analytics data from the service', () => {
    expect(quaterlyAnalyticsService.getPostAnalyticsData).toHaveBeenCalledWith('example', 2023);
    expect(component.analyticsData).toEqual([
      {month:2, postype: 'Type 1', socialaccounttype: 'Account 1', count: 10 },
     
    ]);
  });
 
});
