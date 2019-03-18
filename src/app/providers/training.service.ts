import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { EXERCISE } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private exerciseChanged = new Subject<EXERCISE>();
  private availableExercises: EXERCISE[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: EXERCISE;
  private exercises: EXERCISE[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
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
      duration: this.runningExercise.duration * (100 - process) / 100,
      calories: this.runningExercise.calories * (100 - process) / 100,
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
