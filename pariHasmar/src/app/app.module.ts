import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthInterceptor } from './shared/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertesComponent } from './alertes/alertes.component';
import { ServicesComponent } from './services/services.component';
import { SousServicesComponent } from './services/sous-services/sous-services.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { OperationsComponent } from './operations/operations.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListItemSousServiceComponent } from './services/sous-services/list-item-sous-service/list-item-sous-service.component';
import { ListItemServiceComponent } from './services/list-item-service/list-item-service.component';
import { ListItemUsersComponent } from './users/list-item-users/list-item-users.component';
import { ListItemAlertesComponent } from './alertes/list-item-alertes/list-item-alertes.component';

// import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    AlertesComponent,
    ServicesComponent,
    SousServicesComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    UsersComponent,
    OperationsComponent,
    ListItemSousServiceComponent,
    ListItemServiceComponent,
    ListItemUsersComponent,
    ListItemAlertesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ToastrModule.forRoot()
    // AngularFontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
