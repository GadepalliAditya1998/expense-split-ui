import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable()
export class GroupService {
  constructor(private httpService: HttpService) {}

  public getUsergroups(): Observable<any> {
    return this.httpService.get('group/list');
  }

  public createGroup(group: any): Observable<any> {
    return this.httpService.post('group/add', group);
  }

  public getGroupMembers(groupId: number): Observable<any> {
    return this.httpService.get(`group/${groupId}/members`);
  }
}
