import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
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

  title: string = 'My Angular App'; // Default title

  constructor(
    private router: Router,
    private location: Location
      ) {                               // changing top title toolbar according to navigated page
        router.events.subscribe(val => {
        if (location.path() == "") {
          this.title = "SimpleSloApp";
        } 
        else if (location.path() == "/missing-word") {
          this.title = "Fill in the missing word";
        }
        // else if (location.path() == "/sonce") {
        //   this.title = "Trajanje sončnega obsevanja"
        // }
        // else {
        //   this.title = "Vnos podatkov merilnih postaj"
        // }
      });
    }

  // Close sidenav when the link is clicked
  closeSidenav() {
    this.sidenav.close();
  }
}
