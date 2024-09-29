import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MissingWordComponent } from './missing-word/missing-word.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'missing-word', component: MissingWordComponent }
];