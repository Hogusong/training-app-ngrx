import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TrainingComponent } from './training.component';
import { CurrTrainingComponent } from './curr-training/curr-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: []
})
export class TrainingModule {}