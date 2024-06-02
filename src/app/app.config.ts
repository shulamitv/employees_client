import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpFeature, HttpFeatureKind, } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()),provideClientHydration(),importProvidersFrom(MatDialogModule)]
  
};





