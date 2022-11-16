import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { map, noop, Observable, Observer, of, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { ContextService } from 'src/app/shared/services/context.service';
import { InvitationService } from 'src/app/shared/services/invitation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from '../services/groups.service';

@Component({
  selector: 'app-group-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class GroupMembersComponent implements OnInit {
  public groupId: number = 0;
  public currentUserId: number = 0;
  public isGroupAdmin: boolean = false;
  public groupUsers: Array<any> = [];
  public modalRef?: BsModalRef;

  public inviteViaLink: boolean = false;
  public invitationLink?: string;

  suggestions$?: Observable<any[]>;
  search?: string;
  selectedUsers: Array<any> = [];

  constructor(
    private groupService: GroupService,
    public activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private invitationService: InvitationService,
    private userService: UserService,
    private contextService: ContextService,
    private notificationService: NotificationService,
  ) {
    this.activatedRoute.params.subscribe((d) => {
      this.groupId = +d['id'];
      this.fetchGroupMembers();
    });
  }

  ngOnInit(): void {
    this.initTypeAheadSubscriber();
  }

  public fetchGroupMembers(): void {
    this.groupUsers = [];
    this.groupService.getGroupMembers(this.groupId).subscribe({
      next: (data) => {
        this.groupUsers = data;
        const userId = this.contextService.getUser().id;
        this.currentUserId = userId;
        this.isGroupAdmin = this.groupUsers.find(u=> u.id === userId)?.isAdmin || false;
      },
      error: (err) => {},
    });
  }

  public showAddMemberModal(template: TemplateRef<any>): void {
    const options: ModalOptions = {
      ignoreBackdropClick: true,
    };

    this.modalRef = this.modalService.show(template, options);
  }

  public generateInvitationLink(): void {
    this.invitationService.generateGroupInvitation(this.groupId).subscribe({
      next: (data) => {
        if (data) {
          this.invitationLink = data.inviteLink;
        }
      },
    });
  }

  public initTypeAheadSubscriber(): void {
    this.suggestions$ = new Observable(
      (observer: Observer<string | undefined>) => {
        observer.next(this.search);
      }
    ).pipe(
      switchMap((query: string) => {
        if (query) {
          return this.userService.searchUserConnections(this.search).pipe(
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
    this.selectedUsers.push(event.item);
  }

  public addUser(): void {
    const user = {
      userId: this.selectedUsers[0].id,
    };
    this.groupService.addGroupUser(this.groupId, user).subscribe({
      next: (data) => {
        if (data) {
          this.modalRef?.hide();
          this.notificationService.success('Success', 'User added successfully');
          this.fetchGroupMembers();
        }
      },
    });
  }

  public showDeleteUserModal(userId: number): void {
    const initialState: ModalOptions = {
      ignoreBackdropClick: true,
      initialState: {
      result: (state: boolean) => {
        if(state) {
          this.deleteUser(userId);
        }
      }}
    };
    this.modalRef = this.modalService.show(ConfirmDialogComponent, initialState);
    this.modalRef.content!.description = "Are you sure you want to remove ?";
    this.modalRef.content!.confirmButtonClass = 'btn btn-danger';
  }

  public deleteUser(userId: number): void {
    this.groupService.removeGroupUser(this.groupId, userId).subscribe({next: (d)=>{
        if(d && d.isDeleted) {
          const index = this.groupUsers.findIndex(u=> u.id === userId);
          this.groupUsers.splice(index, 1);
          
          this.notificationService.success('Success', 'User removed successfully');
          this.modalRef?.hide();
          this.modalRef = undefined;
        }
    }});
  }
}
