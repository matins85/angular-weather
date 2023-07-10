import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './weather/components/app-public-sidenav/app-public-sidenav.module'
      ).then((m) => m.AppPublicSidenavModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadingStrategyService2Service,
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
