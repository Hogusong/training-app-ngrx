import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as uiReducer from '../reducers/ui.reducer';
import * as authReducer from '../reducers/auth.reducer';

export interface STATE {
  ui: uiReducer.STATE;
  auth: authReducer.STATE
}

export const reducers: ActionReducerMap<STATE> = {
  ui: uiReducer.reducer,
  auth: authReducer.reducer,
}

const getUiState = createFeatureSelector<uiReducer.STATE>('ui');
export const getIsLoading = createSelector(getUiState, uiReducer.getIsLoading);

const getAuthState = createFeatureSelector<authReducer.STATE>('auth');
export const getAuthStatus = createSelector(getAuthState, authReducer.getAuthStatus);

const initialState = {
  ui: null,  auth: null,  training: null
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}
