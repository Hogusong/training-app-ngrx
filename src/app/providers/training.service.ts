import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EXERCISE } from '../models';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private exerciseChanged = new Subject<EXERCISE>();
  private availableCollection: AngularFirestoreCollection<EXERCISE>;
  private historyCollection: AngularFirestoreCollection<EXERCISE>;
  private runningExercise: EXERCISE;

  constructor(private db: AngularFirestore) {
    this.availableCollection = this.db.collection(
      'availableExercises', ref => ref.orderBy('name', 'asc')
    );
    this.historyCollection = this.db.collection(
      'pastExercises', ref => ref.orderBy('date', 'asc')
    );
  }

  getAvailableExercises(): Observable<EXERCISE[]> {
    return this.availableCollection.snapshotChanges()
      .pipe(map(res => {
        return res.map(action => {
          const data = action.payload.doc.data() as EXERCISE;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
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
      })
  }

  compeleteExercise() {
    const exercise: EXERCISE = { ...this.runningExercise,   date: new Date(),  state: 'completed' }
    this.historyCollection.add(exercise);
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
    this.historyCollection.add(exercise);
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
