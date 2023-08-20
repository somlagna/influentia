import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { QuaterlyAnalyticsComponent } from './quaterly-analytics.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuaterlyAnalyticsServiceService } from '../quaterly-analytics-service.service';

describe('QuaterlyAnalyticsComponent', () => {
  let component: QuaterlyAnalyticsComponent;
  let fixture: ComponentFixture<QuaterlyAnalyticsComponent>;
  let activatedRoute: ActivatedRoute;
  let quaterlyAnalyticsService: QuaterlyAnalyticsServiceService;

  beforeEach(() => {
    activatedRoute = {
      params: of({ year: '2023', username: 'example' })
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [QuaterlyAnalyticsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        QuaterlyAnalyticsServiceService
      ],
      imports: [HttpClientTestingModule] // Import the HttpClientTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(QuaterlyAnalyticsComponent);
    component = fixture.componentInstance;

    // Get the instance of the QuaterlyAnalyticsServiceService from the TestBed
    quaterlyAnalyticsService = TestBed.inject(QuaterlyAnalyticsServiceService);

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
