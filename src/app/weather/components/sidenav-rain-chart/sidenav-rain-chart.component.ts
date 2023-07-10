import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-sidenav-rain-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './sidenav-rain-chart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./sidenav-rain-chart.component.scss'],
})
export class SidenavRainChartComponent {
  barChart: any = new Chart({
    chart: {
      type: 'line',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    yAxis: {
      visible: true,
      gridLineColor: '#bcd8ec',
      lineColor: '#bcd8ec',
      title: {
        text: '',
      },
      labels: {
        formatter: function () {
          return this.value + '';
        },
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      visible: true,
      title: {
        text: '',
      },
      gridLineColor: '#bcd8ec',
      lineColor: '#bcd8ec',
      lineWidth: 0.3,
      categories: ['10AM', '10PM', '12AM'],
    },
    plotOptions: {
      column: {
        allowPointSelect: true,
      },
      series: {
        borderRadius: 50,
      } as any,
    },
    series: [
      {
        type: 'column',
        color: '#bcd8ec',
        data: [
          { y: 1000, color: '#bcd8ec' },
          { y: 900, color: '#bcd8ec' },
          { y: 800, color: '#bcd8ec' },
        ],
      },
    ],
  });
}
