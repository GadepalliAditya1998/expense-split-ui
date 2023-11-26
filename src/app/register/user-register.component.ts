import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../shared/services/invitation.service';
import { UserService } from '../shared/services/user.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegistrationComponent {
  private inviteUrl?: string;
  public errorMessage?: string;
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private activatedRoute: ActivatedRoute,
    public inviteService: InvitationService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.inviteUrl = param['invite'];
      this.errorMessage = undefined;
      if (this.inviteUrl) {
        this.validateAppInviteURL();
      } else {
        this.initForm();
      }
    });
  }

  private initForm() {
    this.formGroup = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        middleName: new FormControl(null),
        lastName: new FormControl(null, Validators.required),
        dateOfBirth: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: this.confirmPasswordValidator }
    );
  }

  public confirmPasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    let passwordValue = (<FormGroup>control).controls['password'].value;
    let confirmPasswordValue = (<FormGroup>control).controls['confirmPassword'].value;

    if ((<FormGroup>control).controls['confirmPassword'].valid) {
      (<FormGroup>control).controls['confirmPassword'].setErrors(null);

      if (passwordValue !== confirmPasswordValue) {
        (<FormGroup>control).controls['confirmPassword'].setErrors({
          passwordMismatch: true,
        });
      }
    }

    return null;
  }

  private validateAppInviteURL(): void {
    this.inviteService.validateAppInviteURL(this.inviteUrl!).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.initForm();
        } else {
          this.errorMessage = 'Invalid invite URL';
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid invite URL';
      },
    });
  }

  public register(): void {
    if (this.formGroup.valid) {
      let user = this.formGroup.value;
      user['referralId'] = this.inviteUrl;
      this.userService.registerUser(user).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigateByUrl('/login');
          }
        },
        error: (err) => {
          this.notificationService.error('Error', err.message);
        },
      });
    }
  }
}
