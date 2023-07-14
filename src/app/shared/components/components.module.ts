import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoObservableComponent } from './botao-observable/botao-observable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisualModule } from '../material/visual.module';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const componentsModuleDeclarations = [
  BotaoObservableComponent,
  MovieCardComponent
];

export const componentsModuleImports = [
  CommonModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  VisualModule,
  HttpClientModule
];

export const componentsModuleProviders = [
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService
];


@NgModule({
  declarations: componentsModuleDeclarations,
  exports: componentsModuleDeclarations,
  imports: componentsModuleImports,
  providers: componentsModuleProviders
})
export class ComponentsModule { }
