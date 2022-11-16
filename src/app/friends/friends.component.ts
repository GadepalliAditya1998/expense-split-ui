import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddUserConnectionComponent, UserInvitationComponent } from '../shared/components';
import { UserInviteType } from '../shared/models/enums';
import { NotificationService } from '../shared/services/notification.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  public connections: Array<any> = [];
  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.fetchUserConnections();
  }

  private fetchUserConnections(): void {
    this.userService.getUserConnections().subscribe({
      next: (users) => {
        this.connections = users;
      },
    });
  }

  public openAddConnectionModal(): void {
    const modalOptions: ModalOptions = {
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        onSuccess: (data: any) => {
          this.notificationService.success('Success', 'User connection added successfully');
          this.fetchUserConnections();
        }
      }
    };

    this.modalService.show(AddUserConnectionComponent, modalOptions);
  }

  public openInviteModal(): void {
    const modalOptions: ModalOptions = {
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        inviteType: UserInviteType.App,
      },
    };
    this.modalService.show(UserInvitationComponent, modalOptions);
  }
}
