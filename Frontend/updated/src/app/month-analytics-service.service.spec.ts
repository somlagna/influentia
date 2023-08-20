import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MonthAnalyticsServiceService } from './month-analytics-service.service';

describe('MonthAnalyticsServiceService', () => {
  let service: MonthAnalyticsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
        providers: [MonthAnalyticsServiceService]
    });
    service = TestBed.inject(MonthAnalyticsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
