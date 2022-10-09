import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'split-expense-ui';

  constructor(private routerService: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      console.log('TODO: Implement home page');
    } else {
      this.routerService.navigateByUrl('login');
    }
  }
}
