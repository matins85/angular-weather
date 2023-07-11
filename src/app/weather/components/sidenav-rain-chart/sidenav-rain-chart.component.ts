import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-sidenav-rain-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './sidenav-rain-chart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./sidenav-rain-chart.component.scss'],
})
export class SidenavRainChartComponent implements OnInit {
  @Input() trends: any;
  category: any[] = [];

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
      categories: ['3h'],
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
        data: this.category,
      },
    ],
  });

  initData() {
    this.category.push({ y: this.trends?.rain['3h'] });
  }

  ngOnInit(): void {
    this.initData();
  }
}
