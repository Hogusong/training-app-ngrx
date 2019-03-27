import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { TrainingComponent } from './training.component';
import { CurrTrainingComponent } from './curr-training/curr-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { SharedModule } from '../library/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from '../reducers/training.reduce';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: []
})
export class TrainingModule {}