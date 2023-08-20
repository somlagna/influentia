import { TestBed } from '@angular/core/testing';

import { YearlyAnalyticsServiceService } from './yearly-analytics-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';

describe('YearlyAnalyticsServiceService', () => {
  let service: YearlyAnalyticsServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], 
      providers: [YearlyAnalyticsServiceService]});
    service = TestBed.inject(YearlyAnalyticsServiceService);
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

    service.getPostAnalyticsData(userName,year).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const url = `http://localhost:8080/api/content/analytics/yearly/${year}/${userName}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });
});
