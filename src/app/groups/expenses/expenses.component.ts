import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private modalService: BsModalService,
    private expenseService: ExpenseService,
    private contextService: ContextService,
    private dateTransform: DatePipe
  ) {

  }

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
}
