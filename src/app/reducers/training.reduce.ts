import { createFeatureSelector, createSelector, Action } from '@ngrx/store';

import * as rootReducer from '../reducers/app.reducer';
import { EXERCISE } from '../models';

const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
const START_TRAINING = '[Training] Start Training';
const STOP_TRAINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: EXERCISE[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: EXERCISE[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;

interface TrainingState {
  availableExercises: EXERCISE[];
  finishedExercises: EXERCISE[];
  activeTraining: EXERCISE;
}

export interface STATE extends rootReducer.STATE {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
