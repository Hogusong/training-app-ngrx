import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as uiReducer from '../reducers/ui.reducer';
import * as authReducer from '../reducers/auth.reducer';
import * as trainingReducer from '../reducers/training.reduce';

export interface STATE {
  ui: uiReducer.STATE;
  auth: authReducer.STATE
  training: trainingReducer.STATE
}

export const reducers: ActionReducerMap<STATE> = {
  ui: uiReducer.reducer,
  auth: authReducer.reducer,
  training: trainingReducer.reducer
}

const getUiState = createFeatureSelector<uiReducer.STATE>('ui');
const getAuthState = createFeatureSelector<authReducer.STATE>('auth');
const getTrainingState = createFeatureSelector<trainingReducer.STATE>('training');

export const getIsLoading = createSelector(getUiState, uiReducer.getIsLoading);
export const getAuthStatus = createSelector(getAuthState, authReducer.getAuthStatus);

export const getAvailableExercises = createSelector(getTrainingState, trainingReducer.getAvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, trainingReducer.getFinishedExercises);
export const getActiveExercise = createSelector(getTrainingState, trainingReducer.getActiveExercise);
