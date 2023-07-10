import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import 'hammerjs';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpService } from './services/http.service';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';
import { reducers } from './weather/store/reducers/weather';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    HttpService,
    NetworkAwarePreloadingStrategyService2Service,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: [
        { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AppModule) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
