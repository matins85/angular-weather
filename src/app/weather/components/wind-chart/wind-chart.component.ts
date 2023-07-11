import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-wind-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './wind-chart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./wind-chart.component.scss'],
})
export class WindChartComponent implements OnInit {
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
          lineColor: '#bcd8ec',
          lineWidth: 0.5,
        },
      },
    },

    legend: {
      enabled: false,
    },
    yAxis: {
      visible: true,
      lineColor: '#bcd8ec',
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
      lineColor: '#bcd8ec',
      lineWidth: 0.5,
      categories: ['Speed', 'DEG', 'Gust'],
    },
    series: [
      {
        color: '#bcd8ec',
        dashStyle: 'Dash',
        type: 'spline',
        data: this.category,
      },
    ],
  });

  initData() {
    this.category.push(
      { y: this.trends?.wind?.speed, selected: true },
      { y: this.trends?.wind?.deg, selected: true },
      { y: this.trends?.wind?.gust, selected: true }
    );
  }

  ngOnInit(): void {
    this.initData();
  }
}
