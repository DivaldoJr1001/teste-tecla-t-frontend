import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, first } from 'rxjs';
import { MovieService } from '../../../../app/core/api/movie.service';
import { AuthService } from '../../../../app/core/security/auth.service';
import { UserDataService } from '../../../../app/core/utils/user-data.service';
import { Movie } from '../../../../app/models/movie.model';
import { environment } from '../../../../environment/environment';
import { LikeTriggerService } from '../../../../app/core/utils/like-trigger.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private userDataService: UserDataService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private likeTriggerService: LikeTriggerService
  ) { }

  @Input() movie!: Movie;
  @Input() likedMovies$ = new BehaviorSubject<string[]>([]);

  loggedIn$ = new BehaviorSubject<boolean>(false);

  imageUrl: string = '';

  processingLike: boolean = false;
  liked: boolean = false;

  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;

    this.loggedIn$ = this.authService.getLoggedInObservable();

    this.likedMovies$.subscribe({
      next: movies => {
        this.liked = movies.includes(this.movie._id);
      }
    });
  }

  getGenres(): string {
    return this.movie.genres.join(', ');
  }

  likeMovie(): void {
    if (!this.processingLike) {
      this.processingLike = true;
      this.loggedIn$.pipe(first()).subscribe({
        next: loggedIn => {
          if (loggedIn) {
            combineLatest([this.userDataService.getUsernameObservable(), this.likedMovies$]).pipe(first()).subscribe({
              next: res => {
                const username = res[0];
                const likedMovies = res[1];

                if (this.liked) {
                  this.movieService.removeLikeMovie(this.movie._id, username).pipe(first()).subscribe({
                    next: _ => {
                      this.movie.likes_count = this.movie.likes_count === 0 ? this.movie.likes_count : this.movie.likes_count - 1;
                      this.likedMovies$.next(likedMovies.filter(mId => mId !== this.movie._id));
                      this.endProcessingLike();
                    }
                  });
                } else {
                  this.movieService.likeMovie(this.movie._id, username).pipe(first()).subscribe({
                    next: _ => {
                      this.movie.likes_count = this.movie.likes_count + 1;
                      likedMovies.push(this.movie._id);
                      this.likedMovies$.next(likedMovies);
                      this.endProcessingLike();
                    }
                  });
                }
              }
            });
          } else {
            this.endProcessingLike();
            this.snackbar.open('Você precisa estar logado para Curtir filmes!', 'OK', {
              horizontalPosition: 'center',
              duration: 4000
            });
          }
        }
      });
    }
  }

  endProcessingLike(): void {
    setTimeout(() => {
      this.processingLike = false;
      this.likeTriggerService.getLikeTrigger().emit();
    }, 500);
  }
}
