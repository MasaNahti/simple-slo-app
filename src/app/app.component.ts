import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common'; // Add this for structural directives

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ 
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    NgIf // Import common module for structural directives like *ngIf or *ngFor
  ]
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;  // Get reference to sidenav

  // Close sidenav when the link is clicked
  closeSidenav() {
    this.sidenav.close();
  }
}
