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
  RemoveWeatherDetails,
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
  loading2: boolean = false;
  stateProfile: Observable<Profile[]>;
  clickEventSubscription?: Subscription;
  options: any = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

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

    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
  }

  success(pos: any) {
    console.log(pos);
  }

  error(err: any) {
    console.log(err);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1200px)'])
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  getLocation() {
    // this.httpService
    //   .getSingleNoAuth(
    //     baseUrl.weatherServer +
    //       `?lat=10&lon=8.5&cnt=8&units=metric&appid=` +
    //       baseUrl.APPID
    //   )
    //   .subscribe(
    //     (data: any) => {
    //       this.loading = false;
    //       this.store.dispatch(new RemoveWeatherDetails([{ id: 1, data: [] }]));
    //       this.store.dispatch(new AddWeatherDetails([{ id: 1, data: data }]));
    //       this.shared.sendClickEvent();
    //     },
    //     () => {}
    //   );

    // // get user curent lon and lat
    this.httpService
      .getSingleNoAuth(baseUrl.geoDBServer + baseUrl.geoDBKey)
      .subscribe(
        (data: any) => {
          this.store.dispatch(new AddProfile([{ id: 1, data: data }]));
          // get weather forcast for present location
          this.getWeatherDetails(data?.latitude, data?.longitude);
        },
        () => {}
      );
  }

  getWeatherDetails(lat: number, lon: number) {
    this.loading2 = true;
    this.httpService
      .getSingleNoAuth(
        baseUrl.weatherServer +
          `?lat=${lat}&lon=${lon}&cnt=8&units=metric&appid=` +
          baseUrl.APPID
      )
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.loading2 = false;
          this.store.dispatch(new RemoveWeatherDetails([{ id: 1, data: [] }]));
          this.store.dispatch(new AddWeatherDetails([{ id: 1, data: data }]));
          this.shared.sendClickEvent();
        },
        () => {}
      );
  }
}
