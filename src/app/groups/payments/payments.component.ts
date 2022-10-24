import { DatePipe, KeyValue, KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../services/expense.service';
import { GroupService } from '../services/groups.service';

@Component({
  selector: 'app-group-payments',
  templateUrl: './payments.component.html',
})
export class ExpensePaymentsComponent implements OnInit {
  groupId: number = 0;

  groupedPaymentTransactions: Array<KeyValue<string, Array<any>>> = [];
  paymentTransactionKeys: Array<any> = [];

  constructor(
    public groupService: GroupService,
    public activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
  ) {
    this.activatedRoute.params.subscribe((d) => {
      this.groupId = +d['id'];
      this.fetchGroupPayments();
    });
  }

  ngOnInit(): void {}

  fetchGroupPayments(): void {
    this.groupedPaymentTransactions = [];
    this.groupService.getGroupPaymentTransactions(this.groupId).subscribe({
      next: (data) => {
        if (data) {
          let paymentTransactions: Array<any> = data;
          paymentTransactions = paymentTransactions.sort((a,b)=> new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());
          
          this.groupedPaymentTransactions = paymentTransactions.reduce((group, transaction) => {
            const date = this.datePipe.transform(transaction.paymentDate, 'MMM YYYY');
            group[date!] = group[date!] || [];
            group[date!].push(transaction);
            return group ;
        }, Object.create(null));
        }
      },
      error: (error) => {},
    });
  }

  public values(item:  any): Array<any> {
    return item.value as Array<any>;
  }
}
