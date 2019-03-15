import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
