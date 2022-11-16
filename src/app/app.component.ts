import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'split-expense-ui';

  constructor(
    private routerService: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeUrl = window.location.hash;
    if (routeUrl.includes('/register')) {
      this.routerService.navigateByUrl('register');
    } else {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.routerService.navigateByUrl('home');
      } else {
        this.routerService.navigateByUrl('login');
      }
    }
  }
}
