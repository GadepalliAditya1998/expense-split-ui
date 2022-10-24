import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GroupService } from '../../services/groups.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  groupId: number = 0;
  formGroup: FormGroup = new FormGroup({});
  expense: any;
  groupUsers: Array<any> = [];
  public isEdit: boolean = false;

  constructor(
    public modalRef: BsModalRef, 
    private groupService: GroupService,
    ) {
  }

  ngOnInit(): void {
    this.isEdit = this.expense !== null && this.expense !== undefined;
    if(this.expense?.splitType === 2) {
      this.fetchGroupMembers();
    }

    this.formGroup = new FormGroup({
      name: new FormControl(this.expense?.name, Validators.required),
      description: new FormControl(this.expense?.description),
      expenseDate: new FormControl(this.expense?.expenseDate || new Date(), Validators.required),
      splitType: new FormControl(this.expense?.splitType, Validators.required),
      amount: new FormControl(this.expense?.paidAmount, Validators.required),
      expenseUsers: new FormArray([]),
      groupId: new FormControl(this.expense?.groupId),
    }, {validators: [this.formValidator()]});
  }

  public onSplitTypeChange(event: any) {
    const val = +event.target.value;

    if(val === 2) {
      this.fetchGroupMembers();
    }
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
        data.expenseUsers = data.expenseUsers.filter((d: any) => d.checked);
        this.modalRef.content.onEdit(data);
        this.modalRef.hide();
      }
    } else {
      console.log(this.formGroup.errors);
    }
  }

  public toggleUser(event: any, user: any) {
    if(event.target.checked) {
      (<Array<any>>this.formGroup.get('expenseUsers')!.value).push({userId: user.id, amount: 0});
    } else {
      const array = (<Array<any>>this.formGroup.get('expenseUsers')!.value);
      const index = array.findIndex((a)=> a === a.userId === user.id);
      array.splice(index, 1);
    }
  }

  private fetchGroupMembers(): void {
    this.groupService.getGroupMembers(this.groupId).subscribe({
      next: data => {
        if(data) {
          this.groupUsers = data;
          this.groupUsers.forEach((user)=>{
            const control = this.getExpenseUserControl(user);
            if(this.expense) {
              const userShare = this.expense.userShares.find((e:any) => e.userId === user.id);
              if(userShare) {
                control.get('amount')?.setValue(userShare.amount);
                control.get('checked')?.setValue(true);
            }
          }

            (<FormArray>this.formGroup.get('expenseUsers')).push(control);
          });
        }
      }, 
      error: (err)=>{

      }});
  }

  private getExpenseUserControl(user: any): FormGroup {
    return new FormGroup({
      userId: new FormControl(user.id),
      name: new FormControl(user.name),
      checked: new FormControl(false),
      amount: new FormControl(0),
    });
  }

  private formValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const splitType = +control.get('splitType')!.value;
      if(splitType === 2)  {
        const expenseUsers: Array<any> = control.get('expenseUsers')!.value;
        if (expenseUsers.length === 0) {
          return { required: true };
        }

        const amount = +control.get('amount')!.value;
        const totalShare = expenseUsers.filter(u=>u.checked).reduce((total, userShare) => {
          return total + (userShare?.amount ?? 0);
        }, 0);

        if (amount !== totalShare) {
          console.log('Amount not matching');
          return { amountMismatch: true };
        }

        return null;
      }
      
      return null;
    };
  }

  public get expenseUsers() {
    return <FormArray>this.formGroup.get('expenseUsers');
  }

  public get isEqualSplit(): boolean {
    return +(this.formGroup.get('splitType')!.value) === 0;
  }
}
