import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AppPublicSidenavListComponent } from '../app-public-sidenav-list/app-public-sidenav-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-app-public-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    HeaderComponent,
    AppPublicSidenavListComponent,
    RouterModule,
  ],
  templateUrl: './app-public-sidenav.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./app-public-sidenav.component.scss'],
})
export class AppPublicSidenavComponent implements OnInit {
  headeropened = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 1200px)'])
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    console.log();
  }
}
