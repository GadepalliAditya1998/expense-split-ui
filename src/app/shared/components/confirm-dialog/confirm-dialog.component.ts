import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  public dialogTitle: string = 'Confirm';
  public title: string = 'Are you sure to proceed?';
  public description?: string;
  public confirmButtonText: string = 'Confirm';
  public cancelButtonText: string = 'Cancel';
  public confirmButtonClass: string = 'btn btn-primary';
  public closeOnCancel: boolean = true;

  constructor(public modalRef: BsModalRef) {}

  public onConfirmClick(): void {
    if(this.modalRef.content.result) {
        this.modalRef.content.result(true);
    }
  }

  public onCancelClick(): void {
    if(this.modalRef.content.result) {
        if(this.closeOnCancel) {
            this.modalRef.hide();
        }

        this.modalRef.content.result(false);
    }
  }
}
