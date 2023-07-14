import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/security/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  logado$ = new BehaviorSubject<boolean>(false);
  username$ = new BehaviorSubject<string>('');
  likedMovies$ = new BehaviorSubject<string[]>([]);

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.inicializar();

    this.logado$ = this.authService.logado$;
    this.username$ = this.authService.username$;
    this.likedMovies$ = this.authService.likedMovies$;
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      autoFocus: false
    });
  };

  logout(): void {
    this.authService.clearValues();
  }
}
