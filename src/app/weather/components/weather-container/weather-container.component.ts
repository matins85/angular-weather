import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  ],
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss'],
})
export class WeatherContainerComponent {}
