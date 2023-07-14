import { Injectable } from "@angular/core";
import { ApibaseService } from "./apibase.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../../models/movie.model";

@Injectable({providedIn: 'root'})
export class MovieService extends ApibaseService {

  override urlFunction = 'movies';

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  getAll(): Observable<Movie[]> {
    return super.get<Movie[]>();
  }

  getById(id: string): Observable<Movie> {
    return super.get<Movie>({ extraUrl: `id/${id}` });
  }

  likeMovie(id: string, username: string): Observable<Movie> {
    return super.put<Movie>(id, { extraUrl: `like`, sufixUrl: `${username}` });
  }

  removeLikeMovie(id: string, username: string): Observable<Movie> {
    return super.put<Movie>(id, { extraUrl: `removeLike`, sufixUrl: `${username}` });
  }
}
