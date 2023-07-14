import { Injectable } from "@angular/core";
import { ApibaseService } from "./apibase.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../../models/movie.model";

@Injectable({providedIn: 'root'})
export class MovieLikesService extends ApibaseService {

  override urlFunction = 'moviesLikes';

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  getAll(): Observable<Movie> {
    return super.get<Movie>();
  }
}
