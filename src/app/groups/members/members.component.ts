import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/groups.service';

@Component({
  selector: 'app-group-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class GroupMembersComponent {
  public groupId: number = 0;
  public groupUsers: Array<any> = [];

  constructor(
    private groupService: GroupService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((d) => {
      this.groupId = +d['id'];
      this.fetchGroupMembers();
    });
  }

  public fetchGroupMembers(): void {
    this.groupUsers = [];
    this.groupService.getGroupMembers(this.groupId).subscribe({
      next: (data) => {
        this.groupUsers = data;
      },
      error: (err) => {},
    });
  }
}
