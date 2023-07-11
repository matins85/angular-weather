import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Profile, WeatherDetails } from 'src/app/model/weather';
import { HttpService } from 'src/app/services/http.service';
import { WeatherService } from 'src/app/services/weather.service';
import {
  AddProfile,
  RemoveProfile,
} from 'src/app/weather/store/actions/weather';
import {
  AppState,
  selectAllProfile,
  selectAllWeatherDetails,
} from 'src/app/weather/store/reducers/weather';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public publicsidenavToggle = new EventEmitter();
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  options: any[] = [];
  cities: any[] = [];
  filteredOptions: Observable<any[]> | undefined;
  clickEventSubscription?: Subscription;
  data: any;
  stateProfile: Observable<Profile[]>;
  stateWeatherDetails: Observable<WeatherDetails[]>;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private shared: WeatherService,
    private store: Store<AppState>
  ) {
    this.stateProfile = store.select(selectAllProfile);
    this.stateWeatherDetails = store.select(selectAllWeatherDetails);
    this.clickEventSubscription = this.shared.getClickEvent().subscribe(() => {
      this.getCities();
    });
    this.createForm();
    this.getCities();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      search: [''],
    });
  }

  getCity(data: any) {
    this.data = data;
    this.store.dispatch(new RemoveProfile([{ id: 1, data: [] }]));
    this.store.dispatch(new AddProfile([{ id: 1, data: data }]));
    this.shared.sendClickEvent(data);
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    return this.options.filter((option) =>
      option?.name?.toLowerCase()?.includes(filterValue)
    );
  }

  getCities() {
    this.stateProfile?.forEach((e) => {
      if (e.length > 0) {
        this.data = e[0]?.data;
        this.getCityBaseOnLocation();
      } else {
        this.stateWeatherDetails?.forEach((e) => {
          if (e.length > 0) {
            this.data = e[0]?.data;
            this.getCityBaseOnLocation();
          }
        });
      }
    });
  }

  getCityBaseOnLocation() {
    if (this.cities?.length > 0) {
    } else {
      this.httpService.getCities().then((data: any) => {
        data?.filter((name: any) => {
          if (
            name?.country?.toUpperCase() ===
            (this.data?.country_code?.toUpperCase() ||
              this.data?.city?.country?.toUpperCase())
          ) {
            this.options.push(name);
            this.cities.push(name);
          }
        });
        this.filteredOptions = this.feedbackForm
          .get('search')
          .valueChanges.pipe(
            startWith(''),
            map((value: string) => this._filter(value))
          );
      });
    }
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavToggle.emit();
  };
}
