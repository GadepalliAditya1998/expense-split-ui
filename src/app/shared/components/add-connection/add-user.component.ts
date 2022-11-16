import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map, noop, Observable, Observer, of, switchMap, tap } from 'rxjs';
import { UserInviteType } from '../../models/enums';
import { InvitationService } from '../../services/invitation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-connection',
  templateUrl: './add-user.component.html',
})
export class AddUserConnectionComponent implements OnInit {
  public inviteType?: UserInviteType;
  public invitationLink?: string;
  public isUserSelected: boolean = false;

  suggestions$?: Observable<any[]>;
  search?: string;
  selectedUsers: Array<any> = [];

  constructor(
    public modalRef: BsModalRef,
    private invitationService: InvitationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initTypeAheadSubscriber();
  }

  public initTypeAheadSubscriber(): void {
    this.suggestions$ = new Observable(
      (observer: Observer<string | undefined>) => {
        observer.next(this.search);
      }
    ).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.userService.searchUsers(this.search).pipe(
            map((data: any) => data || []),
            tap(
              () => noop,
              (err) => {
                // in case of http error
                // this.errorMessage = err && err.message || 'Something goes wrong';
              }
            )
          );
        }

        return of([]);
      })
    );
  }

  onSelect(event: any) {
    if (event && !event.item.isConnection) {
      this.selectedUsers.push(event.item);
    }
  }

  addUserConnection() {
    if (this.selectedUsers && this.selectedUsers.length > 0) {
      const connection = {
        connectedUserId: this.selectedUsers[0].id,
      };
      this.userService.addUserConnection(connection).subscribe({
        next: (data) => {
          if (data) {
            this.modalRef.content.onSuccess(null);
            this.modalRef.hide();
          }
        },
      });
    }
  }
}
