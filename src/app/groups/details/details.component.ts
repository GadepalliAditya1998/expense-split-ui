import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class GroupDetailsComponent {
  @Input() selectedGroup: any;
}
