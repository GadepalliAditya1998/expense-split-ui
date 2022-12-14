import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class InvitationService {
  constructor(private httpService: HttpService) {}
  
  public generateGroupInvitation(groupId: number): Observable<any> {
    return this.httpService.get(`invites/group/${groupId}`);
  }

  public generateAppInvitation(): Observable<any> {
    return this.httpService.get(`invites/app`);
  }

  public validateAppInviteURL(inviteId: string): Observable<any> {
    return this.httpService.get(`invites/app/${inviteId}/verify`);
  }
}
