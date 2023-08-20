import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { YearlyAnalyticsComponent } from './yearly-analytics.component';
import { YearlyAnalyticsServiceService } from '../yearly-analytics-service.service';

describe('QuaterlyAnalyticsComponent', () => {
  let component: YearlyAnalyticsComponent;
  let fixture: ComponentFixture<YearlyAnalyticsComponent>;
  let activatedRoute: ActivatedRoute;
  let quaterlyAnalyticsService: YearlyAnalyticsServiceService;

  beforeEach(() => {
    activatedRoute = {
      params: of({ year: '2023', username: 'example' })
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [YearlyAnalyticsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        YearlyAnalyticsServiceService
      ],
      imports: [HttpClientTestingModule] // Import the HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(YearlyAnalyticsComponent);
    component = fixture.componentInstance;

    // Get the instance of the QuaterlyAnalyticsServiceService from the TestBed
    quaterlyAnalyticsService = TestBed.inject(YearlyAnalyticsServiceService);

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
    expect(quaterlyAnalyticsService.getPostAnalyticsData).toHaveBeenCalledWith('example', 2023);
    expect(component.analyticsData).toEqual([
      { postype: 'Type 1', socialaccounttype: 'Account 1', count: 10 },
      { postype: 'Type 2', socialaccounttype: 'Account 2', count: 5 },
      { postype: 'Type 1', socialaccounttype: 'Account 2', count: 8 },
    ]);
  });
 
});
