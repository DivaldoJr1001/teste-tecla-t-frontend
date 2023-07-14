import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisualModule } from '../shared/material/visual.module';
import { ComponentsModule } from '../shared/components/components.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const dialogsModuleDeclarations = [
  LoginDialogComponent
];

export const dialogsModuleImports = [
  CommonModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  VisualModule,
  ComponentsModule
];

export const dialogsModuleProviders = [
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService
];

@NgModule({
  declarations: dialogsModuleDeclarations,
  imports: dialogsModuleImports,
  providers: dialogsModuleProviders
})
export class DialogsModule { }
