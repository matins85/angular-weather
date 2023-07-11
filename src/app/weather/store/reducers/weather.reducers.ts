import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Profile, WeatherDetails } from 'src/app/model/weather';
import * as WeatherActions from 'src/app/weather/store/actions/weather';
import { Actions } from 'src/app/weather/store/actions/weather';

// profile
interface ProfileState extends EntityState<Profile> {
  total: number;
}

interface WeatherDetailsState extends EntityState<WeatherDetails> {
  total: number;
}

//
export interface State {
  profile: ProfileState;
  weatherDetails: WeatherDetailsState;
}

const adapterProfile = createEntityAdapter<Profile>();
const adapterWeatherDetails = createEntityAdapter<WeatherDetails>();

const ProfileInitialState: ProfileState = adapterProfile.getInitialState({
  total: 0,
});

const WeatherDetailsInitialState: ProfileState =
  adapterWeatherDetails.getInitialState({
    total: 0,
  });

const initialState = {
  profile: ProfileInitialState,
  weatherDetails: WeatherDetailsInitialState,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    // Profile
    case WeatherActions.ExampleActionTypes.GetProfile:
      return {
        ...state,
        profile: adapterProfile.addMany(action.Profilepayload, state.profile),
      };

    case WeatherActions.ExampleActionTypes2.GetProfile:
      return { ...state, profile: adapterProfile.removeOne(1, state.profile) };

    // Weather Details
    case WeatherActions.ExampleActionTypes3.GetWeatherDetails:
      return {
        ...state,
        weatherDetails: adapterWeatherDetails.addMany(
          action.Weatherpayload,
          state.weatherDetails
        ),
      };

    case WeatherActions.ExampleActionTypes4.GetWeatherDetails:
      return {
        ...state,
        weatherDetails: adapterWeatherDetails.removeOne(
          1,
          state.weatherDetails
        ),
      };

    default:
      return state;
  }
}

export const selectProfileState = (state: State) => state.profile;
export const selectWeatherDetailsState = (state: State) => state.weatherDetails;

export const { selectAll: selectAllProfile } = adapterProfile.getSelectors();
export const { selectAll: selectAllWeatherDetails } =
  adapterWeatherDetails.getSelectors();
