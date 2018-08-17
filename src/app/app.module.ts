import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { BeerDetailComponent }  from './beer-detail/beer-detail.component';
import { BeersComponent }      from './beers/beers.component';
import { BeerSearchComponent }  from './beer-search/beer-search.component';
import { MessagesComponent }    from './messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    BeersComponent,
    BeerDetailComponent,
    MessagesComponent,
    BeerSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
