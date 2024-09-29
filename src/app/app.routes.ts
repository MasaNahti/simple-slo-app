import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MissingWordComponent } from './missing-word/missing-word.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'missing-word',
    loadComponent: () => import('./missing-word/missing-word.component').then(m => m.MissingWordComponent)
  }
];