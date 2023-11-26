import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-validation-message',
  templateUrl: './form-validation-message.component.html',
})
export class FormValidationMessageComponent implements OnInit {
  @Input() control?: AbstractControl;
  @Input() controlErrorMessages: any;
  @Input() errorClass: string = 'form-control-error';

  constructor() {}

  ngOnInit() {
    this.controlErrorMessages = {
      required: 'Field is required',
      email: 'Invalid email address',
      passwordMismatch: 'Password and confirm password do not match',
    };
  }

  public get errorMessage(): string {
    if (this.control) {
      const errorKey = Object.keys(this.control.errors!)[0];
      return this.controlErrorMessages[errorKey];
    }

    return '';
  }
}
