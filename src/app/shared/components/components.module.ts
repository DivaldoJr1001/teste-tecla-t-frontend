import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoObservableComponent } from './botao-observable/botao-observable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisualModule } from '../material/visual.module';



@NgModule({
  declarations: [BotaoObservableComponent],
  exports: [BotaoObservableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    VisualModule
  ]
})
export class ComponentsModule { }
