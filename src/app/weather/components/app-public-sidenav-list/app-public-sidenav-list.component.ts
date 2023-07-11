import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Profile, WeatherDetails } from 'src/app/model/weather';
import { WeatherService } from 'src/app/services/weather.service';
import {
  AppState,
  selectAllProfile,
  selectAllWeatherDetails,
} from 'src/app/weather/store/reducers/weather';
import { SidenavRainChartComponent } from '../sidenav-rain-chart/sidenav-rain-chart.component';

@Component({
  selector: 'app-app-public-sidenav-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, SidenavRainChartComponent],
  templateUrl: './app-public-sidenav-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app-public-sidenav-list.component.scss'],
})
export class AppPublicSidenavListComponent {
  @Output() public publicsidenavClose = new EventEmitter();
  clickEventSubscription?: Subscription;
  stateProfile: Observable<Profile[]>;
  stateWeatherDetails: Observable<WeatherDetails[]>;
  cities: any[] = [];
  profile: any;

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
        this.cities = e[0]?.data?.list;
        this.profile = e[0]?.data;
      }
    });
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
  };
}
