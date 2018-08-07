import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HttpModule, RequestOptions } from "@angular/http";
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MatButtonModule, MatCheckboxModule, MatListModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";
import { AuthenticatedHttpService } from '../services/auth.http.service';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/main/main.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RestclickComponent } from './pages/restclick/restclick.component';
import { LoginComponent } from './pages/login/login.component';
import { JoinComponent } from './pages/join/join.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material';


export function authHttpServiceFactory(http: AuthenticatedHttpService, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: "access_token",
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}]
  }), http, options);
}


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RestclickComponent,
    LoginComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatButtonModule, 
    MatCheckboxModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    HttpService,
    AuthenticatedHttpService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthenticatedHttpService, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
