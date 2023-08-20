import { TestBed } from '@angular/core/testing';

import { QuaterlyAnalyticsServiceService } from './quaterly-analytics-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('QuaterlyAnalyticsServiceService', () => {
  let service: QuaterlyAnalyticsServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], 
      providers: [QuaterlyAnalyticsServiceService]});
    service = TestBed.inject(QuaterlyAnalyticsServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve post analytics data', () => {
    const userName = 'JohnDoe';
    const year = 2023;
    const expectedData = [{postype: 'Type 1', socialaccounttype: 'Account 1', count: 10 }];

    service.getPostAnalyticsData(userName, year).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const url = `http://localhost:8080/api/content/analytics/quaterly/${year}/${userName}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });
});
