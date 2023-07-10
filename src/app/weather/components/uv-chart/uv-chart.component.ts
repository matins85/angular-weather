import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-uv-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './uv-chart.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./uv-chart.component.scss'],
})
export class UvChartComponent {
  uvChart: any = new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        innerSize: '90%',
        borderWidth: 20,
        borderColor: '',
        slicedOffset: 20,
        dataLabels: {
          connectorWidth: 10,
        },
      },
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: '',
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'pie',
        data: [{ name: '', y: 2, color: '#286C65' }],
      },
    ],
  });
}
