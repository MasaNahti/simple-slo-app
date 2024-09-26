import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PracticeComponent } from './practice/practice.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'practice', component: PracticeComponent }
  ];
