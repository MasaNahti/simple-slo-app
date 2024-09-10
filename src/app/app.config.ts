// src/app/app.config.ts

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PracticeComponent } from './practice/practice.component';

export const appConfig = {
  providers: [
    provideRouter([
      { path: '', component: PracticeComponent }
    ]),
    provideHttpClient(),
    importProvidersFrom(FormsModule),  // Import FormsModule here for ngModel
  ],
};
