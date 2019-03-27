import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { EXERCISE } from '../models';
import { UIService } from './ui.service';
import * as rootReducer from '../reducers/app.reducer';
import * as uiReducer from '../reducers/ui.reducer';
import * as trainingReducer from '../reducers/training.reduce';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private exerciseChanged = new Subject<EXERCISE>();
  private availableCollection: AngularFirestoreCollection<EXERCISE>;
  private historyCollection: AngularFirestoreCollection<EXERCISE>;
  private runningExercise: EXERCISE;

  constructor(private db: AngularFirestore,
              private uiService: UIService,
              private store: Store<rootReducer.STATE>) {
    this.availableCollection = this.db.collection(
      'availableExercises', ref => ref.orderBy('name', 'asc')
    );
    this.historyCollection = this.db.collection(
      'pastExercises', ref => ref.orderBy('date', 'asc')
    );
  }

  fetchAvailableExercises() {
    this.store.dispatch(new uiReducer.StartLoading());
    this.availableCollection.snapshotChanges().pipe(map(res => {
      return res.map(action => {
        const data = action.payload.doc.data() as EXERCISE;
        data.id = action.payload.doc.id;
        return data;
      })
    }))
    .subscribe(exercises => {
      this.store.dispatch(new trainingReducer.SetAvailableTrainings(exercises));
      this.store.dispatch(new uiReducer.StopLoading());
    }, error => console.log('Firebase is disconnected now!'))
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new trainingReducer.StartTraining(selectedId));
  }

  compeleteExercise() {
    this.store.select(trainingReducer.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      exercise = {
        ...exercise,
        date: (new Date()).toISOString(),
        state: 'completed'
      }
      this.saveExerciseInHistory(exercise);
    });
    this.store.dispatch(new trainingReducer.StopTraining());
  }

  cancelExercise(process: number) {
    this.store.select(trainingReducer.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      const duration = exercise.duration * (process / 100)
      const calories = exercise.calories * (process / 100)
      exercise = {
        ...exercise,
        duration: +duration.toFixed(2),
        calories: +calories.toFixed(2),
        date: (new Date()).toISOString(),
        state: 'cancelled'
      }
      this.saveExerciseInHistory(exercise);
    });
    this.store.dispatch(new trainingReducer.StopTraining());
  }

  saveExerciseInHistory(exercise: EXERCISE) {
    this.historyCollection.add(exercise)
      .catch(error => {
        this.uiService.openSnackbar("Fetching Exercises failed, please try again.", null, 3000)
      });
    this.store.dispatch(new trainingReducer.StopTraining());
  }

  getRunningExercise() {
    return this.exerciseChanged.asObservable();
  }

  getPastExercises(): Observable<EXERCISE[]> {
    return this.historyCollection.snapshotChanges()
      .pipe(map(res => {
        return res.map(action => {
          const data = action.payload.doc.data() as EXERCISE;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
  }

  fetchPastExercises() {
    this.historyCollection.snapshotChanges()
      .pipe(map(res => {
        return res.map(action => {
          const data = action.payload.doc.data() as EXERCISE;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
      .subscribe((exercises: EXERCISE[]) => {
        this.store.dispatch(new trainingReducer.SetFinishedTrainings(exercises));
      })
  }
}
