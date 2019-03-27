import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { ChoiceDialogComponent } from 'src/app/library/choice-dialog.component';
import { TrainingService } from 'src/app/providers/training.service';
import { EXERCISE } from 'src/app/models';
import * as trainingReducer from '../../reducers/training.reduce';

@Component({
  selector: 'app-curr-training',
  templateUrl: './curr-training.component.html',
  styleUrls: ['./curr-training.component.css']
})
export class CurrTrainingComponent implements OnInit {

  exerciseStarted: EXERCISE;
  processTime = 0
  progress = 0;
  timer: any;

  constructor(private trainingService: TrainingService,
              private store: Store<trainingReducer.STATE>,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.store.select(trainingReducer.getActiveTraining).pipe(take(1))
      .subscribe(res => {
        this.exerciseStarted = res;
        this.startOrResumeTimer()
      });
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      const duration = this.exerciseStarted.duration;
      this.processTime++;
      this.progress = Math.round(100 * this.processTime / duration);
      if (this.progress >= 100) {
        this.trainingService.compeleteExercise();
        clearInterval(this.timer);
      }
    }, 100);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(ChoiceDialogComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
