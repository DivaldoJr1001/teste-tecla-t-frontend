import { Injectable } from "@angular/core";
import { ApibaseService } from "./apibase.service";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { User } from "../../../app/models/user.model";

@Injectable({providedIn: 'root'})
export class AuthApiService extends ApibaseService {

  override urlFunction = 'auth';

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  login(user: User): Observable<{ access_token: string }> {
    return super.post<{ access_token: string }>({extraUrl: 'login', objEnvio: user});
  }
}
