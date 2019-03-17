import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChoiceDialogComponent } from 'src/app/library/choice-dialog.component';
import { TrainingService } from 'src/app/providers/training.service';
import { EXERCISE } from 'src/app/models';

@Component({
  selector: 'app-curr-training',
  templateUrl: './curr-training.component.html',
  styleUrls: ['./curr-training.component.css']
})
export class CurrTrainingComponent implements OnInit {

  exerciseStarted: EXERCISE;
  progress = 0;
  timer: any;
  @Output() stopCurrTrainig = new EventEmitter();

  constructor(private trainingService: TrainingService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.exerciseStarted = this.trainingService.getRunningExercise();
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 1
      if (this.progress >= 50) {
        clearInterval(this.timer);
      }
    }, 500);
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
        this.stopCurrTrainig.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
