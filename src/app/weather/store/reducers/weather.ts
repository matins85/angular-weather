import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromExample from './weather.reducers';

export interface AppState {
  example: fromExample.State;
}

export const reducers: ActionReducerMap<AppState, any> = {
  example: fromExample.reducer,
};

// Example selectors
export const selectExampleModule =
  createFeatureSelector<fromExample.State>('example');

// profile
export const selectProfileState = createSelector(
  selectExampleModule,
  fromExample.selectProfileState
);

// weather details
export const selectWeatherDetailsState = createSelector(
  selectExampleModule,
  fromExample.selectWeatherDetailsState
);

//profile
export const selectAllProfile = createSelector(
  selectProfileState,
  fromExample.selectAllProfile
);

// weather details
export const selectAllWeatherDetails = createSelector(
  selectWeatherDetailsState,
  fromExample.selectAllWeatherDetails
);
