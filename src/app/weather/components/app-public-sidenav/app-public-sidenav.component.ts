import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Profile } from 'src/app/model/weather';
import { HttpService } from 'src/app/services/http.service';
import { WeatherService } from 'src/app/services/weather.service';
import {
  AddProfile,
  AddWeatherDetails,
} from 'src/app/weather/store/actions/weather';
import {
  AppState,
  selectAllProfile,
} from 'src/app/weather/store/reducers/weather';
import { baseUrl } from 'src/environments/environment';
import { AppPublicSidenavListComponent } from '../app-public-sidenav-list/app-public-sidenav-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-app-public-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    HeaderComponent,
    AppPublicSidenavListComponent,
    RouterModule,
  ],
  templateUrl: './app-public-sidenav.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app-public-sidenav.component.scss'],
})
export class AppPublicSidenavComponent {
  headeropened = false;
  loading: boolean = false;
  stateProfile: Observable<Profile[]>;
  clickEventSubscription?: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private httpService: HttpService,
    private store: Store<AppState>,
    private shared: WeatherService
  ) {
    this.clickEventSubscription = this.shared
      .getClickEvent()
      .subscribe((data: any) => {
        if (data) {
          this.getWeatherDetails(data?.coord?.lat, data?.coord?.lon);
        }
      });

    this.loading = true;
    this.stateProfile = store.select(selectAllProfile);
    this.getLocation();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1200px)'])
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  getLocation() {
    // get user curent lon and lat
    this.httpService
      .getSingleNoAuth(baseUrl.geoDBServer + baseUrl.geoDBKey)
      .subscribe(
        (data: any) => {
          this.store.dispatch(new AddProfile([{ id: 1, data: data }]));
          // get weather forcast for present location
          this.getWeatherDetails(data?.latitude, data?.longitude);
        },
        () => {
          this.getLocation();
        }
      );
  }

  getWeatherDetails(lat: number, lon: number) {
    this.loading = true;
    this.httpService
      .getSingleNoAuth(
        baseUrl.weatherServer + `?lat=${lat}&lon=${lon}&appid=` + baseUrl.APPID
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.store.dispatch(new AddWeatherDetails([{ id: 1, data: data }]));
          this.shared.sendClickEvent();
        },
        () => {
          this.getLocation();
        }
      );
  }
}
