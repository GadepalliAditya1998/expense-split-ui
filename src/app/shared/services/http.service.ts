import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/${environment.suffix}`;
  }

  public get(path: string, queryParams?: any): Observable<any> {
    let requestHeader = this.headers;
    return this.httpClient.get(`${this.baseUrl}/${path}`, {
      params: queryParams,
      headers: requestHeader,
    });
  }

  public post(path: string, body: any, queryParams?: any, headers?:HttpHeaders): Observable<any> {
    let requestHeader = this.headers;
    
    if(headers) {
      for(var key in headers.keys) {
        requestHeader.append(key, <string>headers.get(key));
      }
    }

    console.log(requestHeader);
    return this.httpClient.post(`${this.baseUrl}/${path}`, body, {
      params: queryParams,
      headers: requestHeader
    });
  }

  public delete(path: string, queryParams?: any): Observable<any> {
    let requestHeader = this.headers;
    return this.httpClient.delete(`${this.baseUrl}/${path}`, {
      params: queryParams,
      headers: requestHeader,
    });
  }

  private get headers() :HttpHeaders | any {
    const token = localStorage.getItem('userToken');
    if(token) {
      let h = new HttpHeaders();
      h = h.append('Authorization' , `Bearer ${token}`);
      h = h.append('content-type' , `application/json`);
      return h;
    }

    return null;
  };
}
