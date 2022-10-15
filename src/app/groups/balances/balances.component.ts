import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../services/groups.service';

@Component({
  selector: 'app-group-balances',
  templateUrl: './balances.component.html',
})
export class GroupBalancesComponent {
  public groupId: number = 0;
  public groupBalances: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.activatedRoute.params.subscribe((route) => {
      this.groupId = route['id'];
      this.fetchGroupBalances();
    });
  }

  public fetchGroupBalances() {
    this.groupService.getGroupUserBalances(this.groupId).subscribe({
      next: (data) => {
        if (data) {
          this.groupBalances = data;
        }
      },
    });
  }
}
