import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  public getContextUserDetails(): Observable<any> {
    return this.httpService.get('users/contextuserdetails');
  }

  public searchUserConnections(query?: string): Observable<any> {
    return this.httpService.get('search/users/connections', { query: query });
  }

  public searchUsers(query?: string): Observable<any> {
    return this.httpService.get('search/users', { query: query });
  }

  public registerUser(user: any): Observable<any> {
    return this.httpService.post('users/create', user);
  }

  public getUserConnections(): Observable<any> {
    return this.httpService.get('users/connections');
  }

  public addUserConnection(connection: any): Observable<any> {
    return this.httpService.post('users/connections', connection);
  }
}
