import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  public getContextUserDetails(): Observable<any> {
    return this.httpService.get('users/contextuserdetails');
  }

  public searchUsers(query?: string): Observable<any> {
    return this.httpService.get('search/users', {query: query});
  }
}
