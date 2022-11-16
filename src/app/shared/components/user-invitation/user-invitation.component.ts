import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserInviteType } from '../../models/enums';
import { InvitationService } from '../../services/invitation.service';

@Component({
  selector: 'app-user-invitation',
  templateUrl: './user-invitation.component.html',
})
export class UserInvitationComponent implements OnInit {
  public inviteType?: UserInviteType;
  public invitationLink?: string;

  constructor(
    public modalRef: BsModalRef,
    private invitationService: InvitationService
  ) {}

  ngOnInit(): void {
    this.generate();
  }

  generate() {
    if (this.inviteType === UserInviteType.App) {
      this.generateAppInviteURL();
    }
  }

  private generateAppInviteURL() {
    this.invitationService.generateAppInvitation().subscribe({
      next: (data) => {
        if (data) {
          this.invitationLink = data.inviteLink;
        }
      },
    });
  }
}
