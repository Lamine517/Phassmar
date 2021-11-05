import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertesComponent } from './alertes/alertes.component';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ServicesComponent } from './services/services.component';
import { SousServicesComponent } from './services/sous-services/sous-services.component';
import { UsersComponent } from './users/users.component';
import { AlerteService } from './shared/alerte.service';
import { AgentServiceService } from './shared/agent-service.service';
import { AgentSousServiceService } from './shared/agent-sousservice.service';
import { AuthGuard } from './shared/auth-guard.service';
import { OperationsComponent } from './operations/operations.component';
import { ListItemServiceComponent } from './services/list-item-service/list-item-service.component';
import { ListItemSousServiceComponent } from './services/sous-services/list-item-sous-service/list-item-sous-service.component';
import { ListItemUsersComponent } from './users/list-item-users/list-item-users.component';
import { ListItemAlertesComponent } from './alertes/list-item-alertes/list-item-alertes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'alertes', canActivate: [AuthGuard], component: AlertesComponent },
  { path: 'services', canActivate: [AuthGuard], component: ServicesComponent },
  { path: 'sous-services', canActivate: [AuthGuard], component: SousServicesComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'operations', canActivate: [AuthGuard], component: OperationsComponent },
  { path: 'services/list-item-service', component: ListItemServiceComponent },
  { path: 'sous-services/list-item-sous-service', component: ListItemSousServiceComponent },
  { path: 'users/list-item-users', component: ListItemUsersComponent },
  { path: 'alertes/list-item-alertes', canActivate: [AuthGuard], component: ListItemAlertesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  providers: [
    AlerteService,
    AgentServiceService,
    AgentSousServiceService,
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
