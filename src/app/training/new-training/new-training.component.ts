import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  isLoading = true;
  exercises: EXERCISE[] = [];
  subscription: Subscription;
  @Output() startTraining = new EventEmitter();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.subscription = this.trainingService.getAvailableExercises().subscribe(res => {
      this.exercises = res;
      this.isLoading = false;
    });
  }

  start(ex) {
    this.trainingService.startExercise(ex.id);
    this.startTraining.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
