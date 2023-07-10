import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPublicSidenavComponent } from './app-public-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: AppPublicSidenavComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {
        path: '',
        loadComponent: () =>
          import('../weather-container/weather-container.component').then(
            (m) => m.WeatherContainerComponent
          ),
        // canLoad: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPublicSidenavRoutingModule {}
