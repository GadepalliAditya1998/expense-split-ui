import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient, 
    private router: Router,
    ) {
    this.baseUrl = `${environment.apiUrl}/${environment.suffix}`;
  }

  public get(path: string, queryParams?: any): Observable<any> {
    let requestHeader = this.headers;
    return this.httpClient.get(`${this.baseUrl}/${path}`, {
      params: queryParams,
      headers: requestHeader,
    }).pipe(
      catchError(this.handleError)
    );
  }

  public post(path: string, body: any, queryParams?: any, headers?:HttpHeaders): Observable<any> {
    let requestHeader = this.headers;
    
    if(headers) {
      for(var key in headers.keys) {
        requestHeader.append(key, <string>headers.get(key));
      }
    }

    return this.httpClient.post(`${this.baseUrl}/${path}`, body, {
      params: queryParams,
      headers: requestHeader
    }).pipe(
      catchError(this.handleError)
    );
  }

  public put(path: string, body: any, queryParams?: any): Observable<any> {
    let requestHeader = this.headers;
    return this.httpClient.put(`${this.baseUrl}/${path}`,body, {
      params: queryParams,
      headers: requestHeader,
    }).pipe(
      catchError(this.handleError)
    );
  }

  public delete(path: string, queryParams?: any): Observable<any> {
    let requestHeader = this.headers;
    return this.httpClient.delete(`${this.baseUrl}/${path}`, {
      params: queryParams,
      headers: requestHeader,
    }).pipe(
      catchError(this.handleError)
    );
  }

  private get headers() :HttpHeaders | any {
    const token = localStorage.getItem('userToken');
    if(token) {
      let h = new HttpHeaders();
      h = h.append('Authorization' , `Bearer ${token}`);
      h = h.append('content-type' , `application/json`);
      h = h.append('Accept', 'application/json; text/plain');
      return h;
    }

    return null;
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

        switch(error.status)
        {
          case 401:
              if(error.url?.includes('users/contextuserdetails')) {
                this.router.navigateByUrl('/login');
              } else {
                throwError(() => new Error('Unauthorized!!'));
              }
            break;
        }
    }
    // Return an observable with a user-facing error message.
  return throwError(() => new Error(error.error.Message));
  }
}
