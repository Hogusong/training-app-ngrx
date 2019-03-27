import { Action } from '@ngrx/store';

export interface STATE {
  isLoading: boolean;
}

const START_LOADING = '[UI] Start Loading'
const STOP_LOADING = '[UI] Stop Loading'

const initialState: STATE = {
  isLoading: false
}

export function reducer(state = initialState, action: uiAction) {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };
    case STOP_LOADING:
      return { isLoading: false };
    default:
      return state;
  }
}

export const getIsLoading = (state: STATE) => state.isLoading; 

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type uiAction = StartLoading | StopLoading;
