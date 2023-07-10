import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
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

  cities: any[] = [
    {
      country: 'NIG',
      city: 'Abuja',
      summary: 'clear sky',
      degree: '20',
    },
    {
      country: 'NIG',
      city: 'Sokoto',
      summary: 'few clouds',
      degree: '30',
    },
    {
      country: 'NIG',
      city: 'Lagos',
      summary: 'scattered clouds',
      degree: '19',
    },
    {
      country: 'NIG',
      city: 'Niger',
      summary: 'broken clouds',
      degree: '21',
    },
    {
      country: 'NIG',
      city: 'Kogi',
      summary: 'shower rain',
      degree: '3',
    },
    {
      country: 'NIG',
      city: 'Abia',
      summary: 'rain',
      degree: '22',
    },
    {
      country: 'NIG',
      city: 'Masaka',
      summary: 'thunderstorm',
      degree: '21',
    },
    {
      country: 'NIG',
      city: 'Karu',
      summary: 'snow',
      degree: '53',
    },
    {
      country: 'NIG',
      city: 'Bida',
      summary: 'mist',
      degree: '22',
    },
  ];

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
  };
}
