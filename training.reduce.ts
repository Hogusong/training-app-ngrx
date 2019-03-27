// import { Action } from '@ngrx/store';

// import * as RootReduce from './app.reducer';
// import { EXERCISE } from '../models';

// export interface STATE {
//   availableExercises: EXERCISE[];
//   finishedExercises: EXERCISE[];
//   activeExercise: EXERCISE
// }

// // export interface STATE extends RootReduce.STATE {
// //   training: TRAININGSTATE
// // }

// export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Training'
// export const SET_FINISHED_TRAININGS = '[Training] Set Finished Training'
// export const START_TRAINING = '[Training] Start Training'
// export const STOP_TRAINING = '[Training] Stop Training'

// const initialState: STATE = {
//   availableExercises: [],
//   finishedExercises: [],
//   activeExercise: null
// }

// export function reducer(state = initialState, action: trainingAction) {
//   switch (action.type) {
//     case SET_AVAILABLE_TRAININGS:
//       state.availableExercises = action.payload;
//       break;
//     case SET_FINISHED_TRAININGS:
//       state.finishedExercises = action.payload;
//       break;
//     case START_TRAINING:
//       state.activeExercise = { ...state.availableExercises.find(ex => ex.id === action.payload) };
//       break;
//     case STOP_TRAINING:
//       state.activeExercise = null;
//   }
//   return state;
// }

// export const getAvailableExercises = (state: STATE) => state.availableExercises.slice();
// export const getFinishedExercises = (state: STATE) => state.finishedExercises.slice();
// export const getActiveExercise = (state: STATE) => { return {...state.activeExercise} };
// export const getOnTraining = (state: STATE) => state.activeExercise != null;

// export class SetAvailableTraining implements Action {
//   readonly type = SET_AVAILABLE_TRAININGS;
//   constructor(public payload: EXERCISE[]) {}
// }

// export class SetFinishedTraining implements Action {
//   readonly type = SET_FINISHED_TRAININGS;
//   constructor(public payload: EXERCISE[]) {}
// }

// export class StartTraining implements Action {
//   readonly type = START_TRAINING;
//   constructor(public payload: string) {}
// }

// export class StopTraining implements Action {
//   readonly type = STOP_TRAINING;
// }

// export type trainingAction = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;

// // export function reducer(state = initialState, action: trainingAction) {
// //   switch (action.type) {
// //     case SET_AVAILABLE_TRAININGS:
// //       return {
// //         ...state,
// //         availableExercises: action.payload
// //       }
// //     case SET_FINISHED_TRAININGS:
// //       return {
// //         ...state,
// //         finishedExercises: action.payload
// //       }
// //     case START_TRAINING:
// //       return {
// //         ...state,
// //         activeExercise: action.payload
// //       }
// //     case STOP_TRAINING:
// //       return {
// //         ...state,
// //         activeExercise: null
// //       }
// //     default:
// //       return state;
// //   }
// // }
