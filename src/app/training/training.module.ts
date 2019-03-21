import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { TrainingComponent } from './training.component';
import { CurrTrainingComponent } from './curr-training/curr-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { SharedModule } from '../library/shared.module';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    SharedModule
  ],
  exports: []
})
export class TrainingModule {}