import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root'
})
export class LikeTriggerService {

  private likeTrigger$ = new EventEmitter;

  getLikeTrigger(): EventEmitter<any> {
    return this.likeTrigger$;
  }
}
