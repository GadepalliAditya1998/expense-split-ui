import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable()
export class LoginService {
  constructor(private httpService: HttpService) {}

  public login(credentials: any): Observable<any> {
    return this.httpService.post('login', credentials);
  }
}
