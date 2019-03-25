import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';
import * as RootReducer from '../../reducers/app.reducer';
import { UIService } from 'src/app/providers/ui.service';
import { async } from 'q';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  isLoading = false;
  exercises$: Observable<EXERCISE[]>;
  count = 0;
  @Output() startTraining = new EventEmitter();

  constructor(private trainingService: TrainingService,
              private store: Store<RootReducer.STATE>,
              private uiService: UIService) { }

  ngOnInit() {
    this.FetchExercises();
  }

  FetchExercises() {
    this.isLoading = true;
    this.trainingService.fetchAvailableExercises();
    setTimeout(() => {
      this.exercises$ = this.store.select(RootReducer.getAvailableExercises);
      this.exercises$.subscribe(res => {
        this.count = res.length;
        this.isLoading = false;
        if (this.count === 0) {
          this.uiService.openSnackbar("Fetching exercises failed. Try again.", null, 3000);
        }
      })
    }, 500);
    
    // this.subscription = this.trainingService.getAvailableExercises().subscribe(res => {
    //   this.exercises = res;
    //   this.isLoading = false;
    //   if (res.length === 0) {
    //     this.uiService.openSnackbar("Fetching exercises failed. Try again.", null, 3000);
    //   }
    // });
  }

  start(ex) {
    this.trainingService.startExercise(ex.id);
    this.startTraining.emit();
  }
}
