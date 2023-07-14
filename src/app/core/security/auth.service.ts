import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logado$ = new BehaviorSubject<boolean>(false);
  username$ = new BehaviorSubject<string>('');
  likedMovies$ = new BehaviorSubject<string[]>([]);

  constructor(
    private jwt: JwtHelperService,
    private userService: UserService
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
      this.username$.next(username);
      localStorage.setItem(StorageData.username, username);

      this.likedMovies$.next(u.likedMovies || []);
      this.saveAuthToken(token);

      this.logado$.next(true);
    });
  }

  clearValues(): void {
    localStorage.removeItem(StorageData.username);
    localStorage.removeItem(StorageData.token);
    this.logado$.next(false);
    this.username$.next('');
    this.likedMovies$.next([]);
  }
}

export enum StorageData {
  token = 'teclaTToken',
  username = 'teclaTUsername'
}
