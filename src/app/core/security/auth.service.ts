import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../api/user.service';
import { UserDataService } from '../utils/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private jwt: JwtHelperService,
    private userService: UserService,
    private userDataService: UserDataService
  ) {
  }

  inicializar(): void {
    const token = this.getAuthToken() || '';
    const username = localStorage.getItem(StorageData.username) || '';

    const validToken = !this.jwt.isTokenExpired(token);

    if (validToken) {
      this.fetchUserInfo(username, token);
    } else {
      this.clearValues();
    }
  }

  getAuthToken(): string | null {
    return localStorage.getItem(StorageData.token)
  }

  saveAuthToken(token: string): void {
    localStorage.setItem(StorageData.token, token)
  }

  fetchUserInfo(username: string, token: string): void {
    this.userService.getUser(username).subscribe(u => {
      this.userDataService.setUsername(username);
      localStorage.setItem(StorageData.username, username);

      this.userDataService.setLikedMovies(u.liked_movies || []);
      this.saveAuthToken(token);

      this.loggedIn$.next(true);
    });
  }

  clearValues(): void {
    localStorage.removeItem(StorageData.username);
    localStorage.removeItem(StorageData.token);
    this.loggedIn$.next(false);
    this.userDataService.clearData();
  }

  getLoggedInObservable(): BehaviorSubject<boolean> {
    return this.loggedIn$;
  }
}

export enum StorageData {
  token = 'teclaTToken',
  username = 'teclaTUsername'
}
