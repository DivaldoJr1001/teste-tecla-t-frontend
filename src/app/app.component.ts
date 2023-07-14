import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/security/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './dialogs/login-dialog/login-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from './core/utils/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {
  loggedIn$ = new BehaviorSubject<boolean>(false);
  username$ = new BehaviorSubject<string>('');
  likedMovies$ = new BehaviorSubject<string[]>([]);

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.authService.inicializar();

    this.loggedIn$ = this.authService.getLoggedInObservable();
    this.username$ = this.userDataService.getUsernameObservable();
    this.likedMovies$ = this.userDataService.getLikedMoviesObservable();
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
