import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/providers/ui.service';

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

  constructor(private trainingService: TrainingService,
              private uiService: UIService) { }

  ngOnInit() {
    this.FetchExercises();
  }

  FetchExercises() {
    this.isLoading = true;
    this.subscription = this.trainingService.getAvailableExercises().subscribe(res => {
      this.exercises = res;
      this.isLoading = false;
      if (res.length === 0) {
        this.uiService.openSnackbar("Fetching exercises failed. Try again.", null, 3000);
      }
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
