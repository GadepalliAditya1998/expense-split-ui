import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  formGroup: FormGroup;
  isEqualSplit: boolean = true;

  constructor(public modalRef: BsModalRef) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      splitType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      expenseUsers: new FormControl([]),
      groupId: new FormControl(this.modalRef.content?.groupId),
    });
  }

  ngOnInit(): void {}

  public onSplitTypeChange(event: any) {
    const val = +event.target.value;
    this.isEqualSplit = val === 0;
  }

  public createExpense(): void {
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      if (data) {
        this.modalRef.content.onCreate(data);
        this.modalRef.hide();
      }
    }
  }
}
