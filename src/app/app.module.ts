import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopularMoviesComponent } from './tabs/popular-movies/popular-movies.component';
import { LikedMoviesComponent } from './tabs/liked-movies/liked-movies.component';
import { VisualModule } from './shared/material/visual.module';

@NgModule({
  declarations: [
    AppComponent,
    PopularMoviesComponent,
    LikedMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    VisualModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
