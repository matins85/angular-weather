import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Profile, WeatherDetails } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
import {
  AppState,
  selectAllProfile,
  selectAllWeatherDetails,
} from 'src/app/weather/store/reducers/weather';
import { GlobalMapComponent } from '../global-map/global-map.component';
import { SunriseChartComponent } from '../sunrise-chart/sunrise-chart.component';
import { UvChartComponent } from '../uv-chart/uv-chart.component';
import { WindChartComponent } from '../wind-chart/wind-chart.component';

@Component({
  selector: 'app-weather-container',
  standalone: true,
  imports: [
    CommonModule,
    WindChartComponent,
    UvChartComponent,
    SunriseChartComponent,
    GlobalMapComponent,
  ],
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss'],
})
export class WeatherContainerComponent {
  stateProfile: Observable<Profile[]>;
  stateWeatherDetails: Observable<WeatherDetails[]>;
  clickEventSubscription?: Subscription;
  data: any;

  constructor(private shared: WeatherService, private store: Store<AppState>) {
    this.stateProfile = store.select(selectAllProfile);
    this.stateWeatherDetails = store.select(selectAllWeatherDetails);
    this.clickEventSubscription = this.shared.getClickEvent().subscribe(() => {
      this.getData();
    });
    this.getData();
  }

  getData() {
    this.stateWeatherDetails?.forEach((e) => {
      if (e.length > 0) {
        this.data = e[0]?.data;
      }
    });
  }
}
