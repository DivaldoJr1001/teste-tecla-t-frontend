import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { delay, first } from 'rxjs/operators';

@Component({
  selector: 'app-botao-observable',
  templateUrl: './botao-observable.component.html',
  styleUrls: ['./botao-observable.component.scss']
})
export class BotaoObservableComponent {

  state: 'ready' | 'loading' | 'success' | 'failure' = 'ready';

  @Input() observable: Observable<any> = new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next();
      subscriber.complete();
    }, 8000);
  });
  @Input() buttonType: 'mat-button' | 'mat-flat-button' = 'mat-button';
  @Input() buttonText = 'Confirmar';
  @Input() buttonColor = '';
  @Input() buttonColorStyle: ThemePalette = 'primary';
  @Input() textColor!: string;
  @Input() disabled = false;
  @Input() buttonReactivates = false;
  @Input() resetTime = 2000;
  @Output() subscriptionResult = new EventEmitter();

  resetObservable: Observable<unknown> = new Observable(_ => {
    setTimeout(() => {
      if (this.buttonReactivates) {
        this.state = 'ready';
      }
    }, this.resetTime);
  });

  buttonPressed(): void {
    this.state = 'loading';
    this.observable.pipe(first()).subscribe({
      next: res => {
        setTimeout(() => {
          this.state = 'success';
          this.subscriptionResult.emit(res);
          this.resetObservable.subscribe();
        }, 1000);

      },
      error: err => {
        setTimeout(() => {
          this.state = 'failure';
          this.subscriptionResult.emit(err);
          this.resetObservable.subscribe();
        }, 1000);
      }
    });
  }
}
