import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { ChoiceDialogComponent } from 'src/app/library/choice-dialog.component';
import { TrainingService } from 'src/app/providers/training.service';
import { EXERCISE } from 'src/app/models';

@Component({
  selector: 'app-curr-training',
  templateUrl: './curr-training.component.html',
  styleUrls: ['./curr-training.component.css']
})
export class CurrTrainingComponent implements OnInit, OnDestroy {

  exerciseStarted: EXERCISE;
  duration: number;
  processTime = 0
  progress = 0;
  timer: any;
  exerciseSubscription: Subscription;
  @Output() stopCurrTrainig = new EventEmitter();

  constructor(private trainingService: TrainingService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.getRunningExercise().subscribe(res => {
      this.exerciseStarted = res;
      this.duration = res.duration;
      console.log(res)
      this.startOrResumeTimer()
    });
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.processTime++;
      this.progress = Math.round(100 * this.processTime / this.duration);
      if (this.progress >= 100) {
        clearInterval(this.timer);
        this.trainingService.compeleteExercise();
        this.stopCurrTrainig.emit();
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
        this.stopCurrTrainig.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
