import { Action } from '@ngrx/store';

export interface STATE {
  authStatus: boolean;
}

const SET_AUTHENTICATED = '[Auth] Set Authenticated'
const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated'

const initialState: STATE = {
  authStatus: false
}

export function reducer(state = initialState, action: authAction) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { authStatus: true };
    case SET_UNAUTHENTICATED:
      return { authStatus: false };
    default:
      return state;
  }
}

export const getAuthStatus = (state: STATE) => state.authStatus; 

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type authAction = SetAuthenticated | SetUnAuthenticated;
