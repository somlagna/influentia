import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPostListComponent } from './user-post-list/user-post-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateUserPostComponent } from './create-user-post/create-user-post.component';
import { FormsModule } from '@angular/forms';
import { YearlyAnalyticsComponent } from './yearly-analytics/yearly-analytics.component';
import { MonthlyAnalyticsComponent } from './monthly-analytics/monthly-analytics.component';
import { SemiAnnuallyAnalyticsComponent } from './semi-annually-analytics/semi-annually-analytics.component';
import { QuaterlyAnalyticsComponent } from './quaterly-analytics/quaterly-analytics.component';

import { AnalyticsComponent } from './analytics/analytics.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './post/post.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './filter.pipe';
import { PostStatusFilterPipe } from './post-status-filter.pipe';
import { FilteranalyticspipePipe } from './filteranalyticspipe.pipe';
import { MonthlyfilteranalyticsPipe } from './monthlyfilteranalytics.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserPostListComponent,
    NavbarComponent,
    CreateUserPostComponent,
    YearlyAnalyticsComponent,
    MonthlyAnalyticsComponent,
    SemiAnnuallyAnalyticsComponent,
    QuaterlyAnalyticsComponent,
    
    AnalyticsComponent,
    
    PostComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    FilterPipe,
    PostStatusFilterPipe,
    FilteranalyticspipePipe,
    MonthlyfilteranalyticsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
