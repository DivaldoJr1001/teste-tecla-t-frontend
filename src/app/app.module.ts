import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopularMoviesComponent } from './tabs/popular-movies/popular-movies.component';
import { LikedMoviesComponent } from './tabs/liked-movies/liked-movies.component';
import { VisualModule } from './shared/material/visual.module';
import { AuthService } from './core/security/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/inteceptors/auth.interceptor';
import { DialogsModule } from './dialogs/dialogs.module';
import { ComponentsModule } from './shared/components/components.module';

export const appModuleDeclarations = [
  AppComponent,
  PopularMoviesComponent,
  LikedMoviesComponent
];

export const appModuleImports = [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  VisualModule,
  DialogsModule,
  ComponentsModule
];

export const appModuleProviders = [
  AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];

@NgModule({
  declarations: appModuleDeclarations,
  imports: appModuleImports,
  providers: appModuleProviders,
  bootstrap: [AppComponent]
})
export class AppModule { }
