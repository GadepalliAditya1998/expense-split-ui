import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
})
export class AddGroupComponent {
  public formGroup: FormGroup;

  constructor(public modalRef: BsModalRef) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  public createGroup(): void {
    if(this.formGroup.valid){
        if(this.modalRef.content.onCreate) {
            this.modalRef.content.onCreate(this.formGroup.value);
            this.modalRef.hide();
        }
    }
  }
}
