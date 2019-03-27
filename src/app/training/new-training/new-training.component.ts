import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';
import * as trainingReducer from '../../reducers/training.reduce';
import * as rootReducer from '../../reducers/app.reducer';
import { UIService } from 'src/app/providers/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  isLoading$: Observable<boolean>;
  exercises$: Observable<EXERCISE[]>;

  constructor(private trainingService: TrainingService,
              private store: Store<trainingReducer.STATE>,
              private uiService: UIService) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(rootReducer.getIsLoading);
    this.exercises$ = this.store.select(trainingReducer.getAvailableExercises);
    this.FetchExercises();
  }

  FetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  start(ex) {
    this.trainingService.startExercise(ex.id);
  }
}
