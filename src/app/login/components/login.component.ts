import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'split-expense-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private loginService: LoginService,
    private routerService: Router,
  ) {
    this.clearCredentials();
    this.initLoginForm();
  }

  public initLoginForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  public login(): void {
    if(this.formGroup.valid) {
      this.loginService.login(this.formGroup.value).subscribe(data=>{
          if(data) {
            localStorage.setItem('userToken', data.token);
            this.routerService.navigateByUrl('home');
          }
      });
    }
  }

  public clearCredentials(): void {
    localStorage.removeItem('userToken');
  }
}
