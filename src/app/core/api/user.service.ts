import { Injectable } from "@angular/core";
import { ApibaseService } from "./apibase.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../../app/models/user.model";

@Injectable({providedIn: 'root'})
export class UserService extends ApibaseService {

  override urlFunction = 'users';

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
  }

  getUser(username: string): Observable<User> {
    return super.get<User>({ extraUrl: `${username}` });
  }

  createUser(user: User): Observable<User> {
    return super.post<User>({ extraUrl: `create`, objEnvio: user });
  }
}
