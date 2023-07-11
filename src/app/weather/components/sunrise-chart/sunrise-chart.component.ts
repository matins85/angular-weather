import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-sunrise-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './sunrise-chart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./sunrise-chart.component.scss'],
})
export class SunriseChartComponent {
  @Input() trends: any;
  category: any[] = [];

  windChart: any = new Chart({
    chart: {
      type: 'spine',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        label: {
          connectorAllowed: false,
        },
      },
      spline: {
        marker: {
          radius: 4,
          lineColor: '#fec62e',
          lineWidth: 0.5,
        },
      },
    },

    legend: {
      enabled: false,
    },
    yAxis: {
      visible: true,
      lineColor: '#fec62e',
      lineWidth: 0.5,
      title: {
        text: '',
      },
      labels: {
        formatter: function () {
          return this.value + '';
        },
      },
    },
    xAxis: {
      visible: true,
      lineColor: '#fec62e',
      lineWidth: 0.5,
      categories: ['Sunrise', 'Sunset'],
    },
    series: [
      {
        color: '#fec62e',
        dashStyle: 'Dash',
        type: 'spline',
        data: this.category,
      },
    ],
  });

  initData() {
    this.category.push(
      { y: this.trends?.city?.sunrise, selected: true },
      { y: this.trends?.city?.sunset, selected: true }
    );
  }

  ngOnInit(): void {
    this.initData();
  }
}
