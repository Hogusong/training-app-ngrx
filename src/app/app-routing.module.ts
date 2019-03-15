import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { CurrTrainingComponent } from './training/curr-training/curr-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent,
    children: [
      { path: 'new', component: NewTrainingComponent },
      { path: 'current', component: CurrTrainingComponent },
      { path: 'past', component: PastTrainingsComponent }      
    ]
  },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
