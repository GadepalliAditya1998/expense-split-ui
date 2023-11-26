import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/shared/services/context.service';

@Component({
  selector: 'app-user-profile-button',
  templateUrl: './user-profile-button.component.html',
  styleUrls: ['./user-profile-button.component.scss'],
})
export class UserProfileButtonComponent implements OnInit {
  @Input() user: any;
  showOptions: boolean = false;

  constructor(public contextService: ContextService,
    public router: Router,
    ) {}

  ngOnInit() {
    console.log(this.user);
  }

  toggleProfileOptions(): void {
    this.showOptions = !this.showOptions;
  }

  hideProfileOptions(): void {
    this.showOptions = false;
  }

  navigateToProfile(): void {
    console.log('Profile');
  }

  logout(): void {
    this.contextService.logoutUser();
    this.router.navigateByUrl('/login');
  }

  navigateToSettings(): void {
    console.log('settings');
  }
}
