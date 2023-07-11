import { Action } from '@ngrx/store';
import { Profile, WeatherDetails } from 'src/app/model/weather';

// profile
export enum ExampleActionTypes {
  GetProfile = '[Profile API] Get Profile',
}

export enum ExampleActionTypes2 {
  GetProfile = '[Profile API] Remove Profile',
}

// weather details
export enum ExampleActionTypes3 {
  GetWeatherDetails = '[WeatherDetails API] Get WeatherDetails',
}

export enum ExampleActionTypes4 {
  GetWeatherDetails = '[WeatherDetails API] Remove WeatherDetails',
}

// profile
export const ADD_PROFILE = '[PROFILE] Add';
export const REMOVE_PROFILE = '[PROFILE] Remove';
// weather details
export const ADD_WEATHERDETAILS = '[WEATHERDETAILS] Add';
export const REMOVE_WEATHERDETAILS = '[WEATHERDETAILS] Remove';

// profile
export class AddProfile implements Action {
  public readonly type = ExampleActionTypes.GetProfile;

  constructor(public Profilepayload: Profile[]) {}
}

export class RemoveProfile implements Action {
  public readonly type = ExampleActionTypes2.GetProfile;

  constructor(public Profilepayload: any) {}
}

// weather details
export class AddWeatherDetails implements Action {
  public readonly type = ExampleActionTypes3.GetWeatherDetails;

  constructor(public Weatherpayload: WeatherDetails[]) {}
}

export class RemoveWeatherDetails implements Action {
  public readonly type = ExampleActionTypes4.GetWeatherDetails;

  constructor(public Weatherpayload: any) {}
}

export type Actions =
  | AddProfile
  | RemoveProfile
  | AddWeatherDetails
  | RemoveWeatherDetails;
