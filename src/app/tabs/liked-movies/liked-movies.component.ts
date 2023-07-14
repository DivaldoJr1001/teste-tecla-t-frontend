import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, first } from 'rxjs';
import { MovieLikesService } from '../../../app/core/api/movie-likes.service';
import { TopTenListService } from '../../../app/core/api/top-ten-list.service';
import { LikeTriggerService } from '../../../app/core/utils/like-trigger.service';
import { UserDataService } from '../../../app/core/utils/user-data.service';
import { Movie } from '../../../app/models/movie.model';

@Component({
  selector: 'app-liked-movies',
  templateUrl: './liked-movies.component.html',
  styleUrls: ['./liked-movies.component.scss']
})
export class LikedMoviesComponent implements OnInit {

  loading$ = new BehaviorSubject<boolean>(true);
  moviesList$ = new BehaviorSubject<Movie[]>([]);
  likedMovies$ = new BehaviorSubject<string[]>([]);

  constructor(
    private movielikesService: MovieLikesService,
    private topTenListService: TopTenListService,
    private userDataService: UserDataService,
    private likeTriggerService: LikeTriggerService
  ) { }

  ngOnInit(): void {
    this.updateList();
    this.likeTriggerService.getLikeTrigger().subscribe(_ => {
      this.updateList();
    })
    setInterval(() => {
      this.updateList();
    }, 10000);
  }

  updateList(): void {
    combineLatest([this.movielikesService.getAll(), this.topTenListService.getAll(), this.moviesList$]).pipe(first()).subscribe({
      next: res => {
        const movies = res[0];
        const topTenList = res[1].topTenMovies;
        const oldMovieslist = res[2];

        const filteredMoviesList = movies.filter(m => topTenList.includes(parseInt(m._id)));

        if (oldMovieslist.map(m => m._id).join(', ') !== filteredMoviesList.map(m => m._id).join(', ')) {
          this.loading$.next(true);
        }

        setTimeout(() => {
          this.moviesList$.next(filteredMoviesList);
          this.likedMovies$ = this.userDataService.getLikedMoviesObservable();
          this.loading$.next(false);
        }, 1000);
      }
    });
  }

}
