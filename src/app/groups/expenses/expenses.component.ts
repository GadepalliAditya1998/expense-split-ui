import { DatePipe, KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { ContextService } from 'src/app/shared/services/context.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseService } from '../services/expense.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  groupId: number = 0;
  expensesList: Array<KeyValue<string, Array<any>>> = [];
  contextUser: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private modalService: BsModalService,
    private expenseService: ExpenseService,
    private contextService: ContextService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.contextUser = this.contextService.getUser();
    this.activatedRoute.params.subscribe((d) => {
      this.groupId = d['id'];
      this.fetchGroupExpenses();
    });
  }

  public fetchGroupExpenses(): void {
    this.expensesList = [];
    this.httpService.get(`expenses/group/${this.groupId}/list`).subscribe({
      next: (data: Array<any>) => {
        const expenses: Array<any> = data;
        this.expensesList = expenses.reduce((group, expense) => {
          const date = this.datePipe.transform(expense.expenseDate, 'MMM YYYY');
          group[date!] = group[date!] || [];
          group[date!].push(expense);
          return group ;
      }, Object.create(null));
      },
      error: (err) => {},
    });
  }

  public createExpense(data: any): void {
    this.expenseService.createExpense(data).subscribe({
      next: (d) => {
        this.notificationService.success("Success", "Expense created successfully");
        this.fetchGroupExpenses();
      },
      error: (err) => {},
    });
  }

  public showAddExpenseModal(): void {
    const options: ModalOptions = {
      initialState: {
        onCreate: (data: any) => {
          data.groupId = this.groupId;
          data.splitType = +data.splitType;
          this.createExpense(data);
        },
      },
      ignoreBackdropClick: true,
    };
    const ref = this.modalService.show(AddExpenseComponent, options);
    ref.content!.groupId = this.groupId;
  }

  public editExpense(expense: any): void {
    const options: ModalOptions = {
      initialState: {
        groupId: this.groupId,
        isEdit: true,
        expense: expense,
        onEdit: (data: any) => {
          this.expenseService.editGroupExpense(this.groupId, expense.expenseId, data).subscribe({next: (data)=>{
            this.notificationService.success("Success", "Expense updated successfully");
            this.fetchGroupExpenses();
          }});
        },
      },
      ignoreBackdropClick: true,
    };
    const ref = this.modalService.show(AddExpenseComponent, options);
    ref.content!.expense = expense;
  }

  public showConfirmDeleteModal(key: string, id: number) {
    let ref : BsModalRef;
    const options: ModalOptions = {
      initialState: {
        result: (result: boolean)=>{
          if(result) {
            this.deleteExpense(key, id);
            ref.hide();
          }
        },
      },
      ignoreBackdropClick: true,
    };
    
    ref =  this.modalService.show(ConfirmDialogComponent, options);
    ref.content!.title = 'Are you sure to delete the expense?';
    ref.content!.confirmButtonClass = 'btn btn-danger';
  }

  public deleteExpense(key: string, id: number) {
    this.expenseService
      .deleteGroupExpense(this.groupId, id)
      .subscribe({ next: (d) => {
        this.notificationService.success("Success","Expense deleted successfully");
        this.fetchGroupExpenses();
      }, error: (err) => {} });
  }

  public values(item: any): Array<any> {
    return item.value as  Array<any>;
  }
}