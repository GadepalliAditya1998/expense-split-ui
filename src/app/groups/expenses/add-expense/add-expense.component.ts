import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isEqualSplit: boolean = true;
  expense: any;
  public isEdit: boolean = false;

  constructor(public modalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.isEdit = this.expense !== null && this.expense !== undefined;
    this.formGroup = new FormGroup({
      name: new FormControl(this.expense?.name, Validators.required),
      description: new FormControl(this.expense?.description),
      splitType: new FormControl(this.expense?.splitType, Validators.required),
      amount: new FormControl(this.expense?.paidAmount, Validators.required),
      expenseUsers: new FormControl([]),
      groupId: new FormControl(this.expense?.groupId),
    });
  }

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

  public updateExpense(): void {
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      if (data) {
        this.modalRef.content.onEdit(data);
        this.modalRef.hide();
      }
    }
  }
}
