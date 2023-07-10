import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from 'src/app/model/weather';
import * as WeatherActions from 'src/app/weather/store/actions/weather';

interface ProfileState extends EntityState<Profile> {
  total: number;
}

export interface State {
  profile: ProfileState;
}

const adapterProfile = createEntityAdapter<Profile>();

const ProfileInitialState: ProfileState = adapterProfile.getInitialState({
  total: 0,
});

const initialState = {
  profile: ProfileInitialState,
};

export function reducer(
  state: State = initialState,
  action: WeatherActions.Actions
): State {
  switch (action.type) {
    // Profile
    case WeatherActions.ExampleActionTypes.GetProfile:
      return {
        ...state,
        profile: adapterProfile.addMany(action.Profilepayload, state.profile),
      };

    case WeatherActions.ExampleActionTypes2.GetProfile:
      return { ...state, profile: adapterProfile.removeOne(1, state.profile) };

    default:
      return state;
  }
}

export const selectProfileState = (state: State) => state.profile;

export const { selectAll: selectAllProfile } = adapterProfile.getSelectors();
