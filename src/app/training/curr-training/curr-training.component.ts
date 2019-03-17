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
  duration: number;
  processTime = 0
  progress = 0;
  timer: any;
  @Output() stopCurrTrainig = new EventEmitter();

  constructor(private trainingService: TrainingService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.exerciseStarted = this.trainingService.getRunningExercise();
    this.duration = this.exerciseStarted.duration;
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    console.time('time this')
    this.timer = setInterval(() => {
      this.processTime++;
      this.progress = Math.round(100 * this.processTime / this.duration);
      if (this.progress >= 100) {
        clearInterval(this.timer);
        console.timeEnd('time this')
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
        this.stopCurrTrainig.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }
}
