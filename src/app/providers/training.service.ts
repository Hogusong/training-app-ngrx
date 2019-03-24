import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';

import { EXERCISE } from '../models';
import { UIService } from './ui.service';
import * as RootReducer from '../reducers/app.reducer';
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
              private store: Store<RootReducer.STATE>) {
    this.availableCollection = this.db.collection(
      'availableExercises', ref => ref.orderBy('name', 'asc')
    );
    this.historyCollection = this.db.collection(
      'pastExercises', ref => ref.orderBy('date', 'asc')
    );
  }

  fetchAvailableExercises() {
    this.availableCollection.snapshotChanges().pipe(map(res => {
      return res.map(action => {
        const data = action.payload.doc.data() as EXERCISE;
        data.id = action.payload.doc.id;
        return data;
      })
    }))
    .subscribe(exercises => {
      this.store.dispatch(new trainingReducer.SetAvailableTraining(exercises));
    }, error => console.log('Firebase is disconnected now!'))
  }

  startExercise(selectedId: string) {
    // can update one document
    // this.db.doc('availableExercises/' + selectedId).update({ date: new Date() });
    this.availableCollection.doc(selectedId).ref.get()
      .then(doc => {
        this.runningExercise = doc.data() as EXERCISE;
        this.runningExercise.id = selectedId;
        this.exerciseChanged.next(this.runningExercise);
      })
      .catch(err => {
        this.exerciseChanged.next(this.runningExercise = null);
        this.uiService.openSnackbar(err.message, null, 3000);
      })
  }

  compeleteExercise() {
    const exercise: EXERCISE = { ...this.runningExercise,   date: new Date(),  state: 'completed' }
    this.historyCollection.add(exercise)
      .catch(error => {
        this.uiService.openSnackbar("Fetching Exercises failed, please try again.", null, 3000)
      });
  }

  cancelExercise(process: number) {
    const duration = this.runningExercise.duration * (process / 100)
    const calories = this.runningExercise.calories * (process / 100)
    const exercise: EXERCISE = {
      ...this.runningExercise,
      duration: +duration.toFixed(2),
      calories: +calories.toFixed(2),
      date: new Date(),
      state: 'cancelled' 
    }
    this.historyCollection.add(exercise)
      .catch(error => {
        this.uiService.openSnackbar("Fetching Exercises failed, please try again.", null, 3000)
      });
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
          data.date = new Date(data.date.seconds * 1000);
          return data;
        })
      }))
  }
}
