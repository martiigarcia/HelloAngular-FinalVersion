import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersonModule} from "./person/person.module";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";
import {AuthenticationService} from "./security/service/authentication.service";
import {LoginFormComponent} from './login/login-form/login-form.component';
import {TokenInterceptor} from "./security/interceptor/token-interceptor";
import {LayoutComponent} from "./layout/layout.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {UserShowPipe} from './pipes/user-show.pipe';
import {BusesModule} from "./buses/buses.module";
import {TripsModule} from "./trips/trips.module";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidenavComponent,
    LoginFormComponent,
    UserShowPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PersonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    BusesModule,
    TripsModule,
  ],
  providers: [AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
