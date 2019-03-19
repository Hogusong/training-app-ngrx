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
  private exercisesCollection: AngularFirestoreCollection<EXERCISE>;
  private availableExercises: EXERCISE[] = [];
  private runningExercise: EXERCISE;
  private exercises: EXERCISE[] = [];

  constructor(private db: AngularFirestore) {
    this.exercisesCollection = this.db.collection(
      'availableExercises', ref => ref.orderBy('name', 'asc')
    )
  }

  getAvailableExercises(): Observable<EXERCISE[]> {
    return this.exercisesCollection.snapshotChanges()
      .pipe(map(res => {
        return res.map(action => {
          const data = action.payload.doc.data() as EXERCISE;
          data.id = action.payload.doc.id;
          return data;
        })
      }))
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  compeleteExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.exerciseChanged.next(this.runningExercise = null);
  }

  cancelExercise(process: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (process / 100),
      calories: this.runningExercise.calories * (process / 100),
      date: new Date(),
      state: 'cancelled' 
    })
    this.exerciseChanged.next(this.runningExercise = null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getPastExercises() {
    return [...this.exercises];
  }
}
