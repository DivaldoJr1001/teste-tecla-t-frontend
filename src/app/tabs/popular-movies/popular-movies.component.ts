import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MovieService } from '../../../app/core/api/movie.service';
import { TopTenListService } from '../../../app/core/api/top-ten-list.service';
import { UserDataService } from '../../../app/core/utils/user-data.service';
import { Movie } from '../../../app/models/movie.model';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {

  loading$ = new BehaviorSubject<boolean>(true);
  moviesList$ = new BehaviorSubject<Movie[]>([]);
  likedMovies$ = new BehaviorSubject<string[]>([]);


  constructor(
    private movieService: MovieService,
    private topTenListService: TopTenListService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    combineLatest([this.movieService.getAll(), this.topTenListService.getAll()]).subscribe({
      next: res => {
        const movies = res[0];
        const topTenList = res[1].topTenMovies;

        const filteredMoviesList = topTenList.map(mId => movies.find(m => m._id === mId.toString())!).filter(m => m !== undefined);

        setTimeout(() => {
          this.moviesList$.next(filteredMoviesList);
          this.likedMovies$ = this.userDataService.getLikedMoviesObservable();
          this.loading$.next(false);
        }, 2000);
      }
    });
  }
}
