import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextService } from '../shared/services/context.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private contextService: ContextService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.getContextUserDetails().subscribe({
      next: (data) => {
        if (data) {
          this.contextService.setUser(data);
        }
      },
      error: (err) => {
        this.router.navigateByUrl('/login');
      },
    });
  }
}
