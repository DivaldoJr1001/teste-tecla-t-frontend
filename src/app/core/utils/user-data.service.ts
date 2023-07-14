import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private username$ = new BehaviorSubject<string>('');
  private likedMovies$ = new BehaviorSubject<string[]>([]);

  getUsernameObservable(): BehaviorSubject<string> {
    return this.username$;
  }

  setUsername(username: string): void {
    this.username$.next(username);
  }

  getLikedMoviesObservable(): BehaviorSubject<string[]> {
    return this.likedMovies$;
  }

  setLikedMovies(movies: string[]): void {
    this.likedMovies$.next(movies);
  }

  clearData(): void {
    this.username$.next('');
    this.likedMovies$.next([]);
  }
}

export enum StorageData {
  token = 'teclaTToken',
  username = 'teclaTUsername'
}
