import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as uiReducer from '../reducers/ui.reducer';

export interface STATE {
  ui: uiReducer.STATE;
}

export const reducers: ActionReducerMap<STATE> = {
  ui: uiReducer.reducer
}

const getUiState = createFeatureSelector<uiReducer.STATE>('ui');
export const getIsLoading = createSelector(getUiState, uiReducer.getIsLoading);
