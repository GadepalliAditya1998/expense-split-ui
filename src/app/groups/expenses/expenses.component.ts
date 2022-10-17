import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { ContextService } from 'src/app/shared/services/context.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { GroupExpenseListItem } from './models/expense-group-list-item.model';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  groupId: number = 0;
  expensesList: Map<string, Array<any>> = new Map();
  contextUser: any;

  private groupDateKeys: Array<string> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private modalService: BsModalService,
    private expenseService: ExpenseService,
    private contextService: ContextService,
    private dateTransform: DatePipe
  ) {}

  ngOnInit(): void {
    this.contextUser = this.contextService.getUser();
    this.activatedRoute.params.subscribe((d) => {
      this.groupId = d['id'];
      this.expensesList = new Map();
      this.fetchGroupExpenses();
    });
  }

  public fetchGroupExpenses(): void {
    this.httpService.get(`expenses/group/${this.groupId}/list`).subscribe({
      next: (data: Array<any>) => {
        this.clearKeys();

        for (let d of data) {
          const date = <string>this.dateTransform.transform(d.expenseDate, 'MMM YYYY');
          if (this.expensesList.has(date)) {
            this.expensesList.get(date)!.push(d);
          } else {
            this.expensesList.set(date,[d]);
          }
        }
      },
      error: (err) => {},
    });
  }

  public createExpense(data: any): void {
    this.expenseService.createExpense(data).subscribe({
      next: (d) => {
        data.id = d;
        const date = <string>this.dateTransform.transform(new Date(), 'MMM YYYY');
        if(this.expensesList.has(date)) {
          this.expensesList.get(date)!.push(data);
        } else {
          this.expensesList.set(date,[data]);
        }

        this.clearKeys();
      },
      error: (err) => {},
    });
  }

  public showAddExpenseModal(): void {
    const options: ModalOptions = {
      initialState: {
        groupId: this.groupId,
        onCreate: (data: any) => {
          data.groupId = this.groupId;
          data.splitType = +data.splitType;
          this.createExpense(data);
        },
      },
      ignoreBackdropClick: true,
    };
    this.modalService.show(AddExpenseComponent, options);
  }

  public editExpense(expense: any): void {
    const options: ModalOptions = {
      initialState: {
        isEdit: true,
        expense: expense,
        onEdit: (data: any) => {
          this.expenseService.editGroupExpense(this.groupId, expense.expenseId, data).subscribe({next: (data)=>{
            console.log(data);
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
        if(d) {
          const index = this.expensesList.get(key)!.findIndex(e => e.expenseId === id);
          if(index != -1) {
            this.expensesList.get(key)!.splice(index, 1);
            this.clearKeys();
          }
        }
      }, error: (err) => {} });
  }

  public keys(): Array<string> {
    if(this.groupDateKeys.length === 0) {
      this.groupDateKeys = Array.from(this.expensesList.keys());
    }

    return this.groupDateKeys;
  }

  private clearKeys(): void {
    this.groupDateKeys = [];
  }
}