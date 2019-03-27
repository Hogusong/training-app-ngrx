import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { EXERCISE } from '../models';
import * as trainingReducer from '../reducers/training.reduce';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onTraining$: Observable<boolean>;

  constructor(private store: Store<trainingReducer.STATE>) {}

  ngOnInit() {
    this.onTraining$ = this.store.select(trainingReducer.getIsTraining)
  }
}
