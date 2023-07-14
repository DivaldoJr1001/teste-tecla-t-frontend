import { Injectable } from "@angular/core";
import { ApibaseService } from "./apibase.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TopTenMovies } from "../../../app/models/top-ten-movies.model";

@Injectable({providedIn: 'root'})
export class TopTenListService extends ApibaseService {

  override urlFunction = 'toptenlist';

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  getAll(): Observable<TopTenMovies> {
    return super.get<TopTenMovies>();
  }
}
