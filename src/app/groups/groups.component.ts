import { Component, OnInit } from '@angular/core';
import { GroupService } from './services/groups.service';
import { AddGroupComponent } from './add-group';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  selectedGroupId: number = 0;
  selectedGroup: any;
  groups: Array<any> = [];
  constructor(
    private groupService: GroupService,
    private bsModalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserGroups();
  }

  public expandGroup(i: number): void {
    this.selectedGroupId = i;
    this.selectGroup(i);
  }

  public loadUserGroups(): void {
    this.groupService.getUsergroups().subscribe((d) => {
      if (d) {
        this.groups = d;
        this.selectGroup(this.groups[0].id);
      }
    });
  }

  private selectGroup(id: number): void {
    this.selectedGroupId = id;
    this.selectedGroup = this.groups.find((g) => g.id === id);
    // console.log(`groups/${this.selectedGroupId}/expenses`);
    this.router.navigateByUrl(`${this.selectedGroupId}/expenses`);
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
