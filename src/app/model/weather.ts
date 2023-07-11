export interface City {
  id: number;
  name: string;
  population?: number;
  coord?: Coordinates;
  country?: string;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Forecast {
  temp: number;
  temp_min: number;
  temp_max: number;

  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherSys {
  pod: string;
}

export interface WeatherList {
  dt: number;
  main: Forecast;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  sys: WeatherSys;
  dt_txt: string;
}

export interface Weather {
  city?: City;
  cod?: string;
  message?: number;
  cnt?: number;
  list?: WeatherList[];
}

export interface Summary {
  city: string;
}

export interface Profile {
  id: number;
  data: any;
}

export let RedMap: any = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10.5111142, 7.4066299],
      },
      properties: {
        state: 'Alabama',
        name: 'Montgomery',
        density: 77.9,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10.5123749, 7.3942885],
      },
      properties: {
        state: 'Alaska',
        name: 'Juneau',
        density: 37.9,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10.5102436, 7.3747219],
      },
      properties: {
        state: 'Arizona',
        name: 'Phoenix',
        density: 89.9,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10.488983, 7.4001799],
      },
      properties: {
        state: 'Arkansas',
        name: 'Little Rock',
        density: 99,
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10.805952, 7.715194],
      },
      properties: {
        state: 'California',
        name: 'Sacramento',
        density: 21.7,
      },
    },
  ],
};
