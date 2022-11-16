import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  constructor(private toastService: ToastrService) {}

  public success(title: string, message: string) {
    this.toastService.success(message, title);
  }

  public error(title: string, message: string) {
    this.toastService.error(message, title);
  }

  public warning(title: string, message: string) {
    this.toastService.warning(message, title);
  }

  public info(title: string, message: string) {
    this.toastService.info(message, title);
  }
}
