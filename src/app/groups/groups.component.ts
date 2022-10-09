import { Component, OnInit } from '@angular/core';
import { GroupService } from './services/groups.service';
import { AddGroupComponent } from './add-group';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  selectedGroupId: number = 0;
  groups: Array<any> = [];
  constructor(
    private groupService: GroupService,
    private bsModalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadUserGroups();
  }

  public expandGroup(i: number): void {
    this.selectedGroupId = i;
  }

  public loadUserGroups(): void {
    this.groupService.getUsergroups().subscribe((d) => {
      if (d) {
        this.groups = d;
      }
    });
  }

  public showAddGroupModel(): void {
    const options: ModalOptions = {
      initialState: {
        onCreate: (data: any) => {
          this.createGroup(data);
        },
      },
      ignoreBackdropClick: true,
    };
    this.bsModalService.show(AddGroupComponent, options);
  }

  public createGroup(data: any): void {
    this.groupService.createGroup(data).subscribe((d) => {
      if (d) {
        this.loadUserGroups();
      }
    });
  }
}
