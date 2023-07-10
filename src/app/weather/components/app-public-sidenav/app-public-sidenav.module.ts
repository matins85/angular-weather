import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { AppPublicSidenavRoutingModule } from './app-public-sidenav-routing.module';

@NgModule({
  imports: [CommonModule, AppPublicSidenavRoutingModule, ChartModule],
})
export class AppPublicSidenavModule {}
