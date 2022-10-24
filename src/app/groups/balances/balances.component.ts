import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ContextService } from 'src/app/shared/services/context.service';
import { GroupService } from '../services/groups.service';
import { SettleUpComponent } from '../settleup/settleup.component';

@Component({
  selector: 'app-group-balances',
  templateUrl: './balances.component.html',
})
export class GroupBalancesComponent {
  public groupId: number = 0;
  public groupBalances: Array<any> = [];

  private currentUser; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private modalService: BsModalService,
    private contextService: ContextService,
  ) {
    this.currentUser = this.contextService.getUser();
    this.activatedRoute.params.subscribe((route) => {
      this.groupId = route['id'];
      this.fetchGroupBalances();
    });
  }

  public fetchGroupBalances() {
    this.groupBalances = [];
    this.groupService.getGroupUserBalances(this.groupId).subscribe({
      next: (data) => {
        if (data) {
          this.groupBalances = data;
        }
      },
    });
  }

  public showRecordPaymentModal(groupBalance: any): void {
    const options: ModalOptions = {
      initialState: {
        balance: {
          amount: groupBalance.balance,
          paidByUser: !groupBalance.isInDebt ?  { name: groupBalance.name, id: groupBalance.userId  } :{ id: this.currentUser.id, name: `${this.currentUser.firstName} ${this.currentUser.lastName}` },
          paidToUser: groupBalance.isInDebt ?  { name: groupBalance.name, id: groupBalance.userId  } :{ id: this.currentUser.id, name: `${this.currentUser.firstName} ${this.currentUser.lastName}` },
        },
        onPayment: (paymentTransaction: any) => {
          const transaction = {
            groupId: +this.groupId,
            paidByUserId: paymentTransaction.paidByUserId,
            paidToUserId: paymentTransaction.paidToUserId,
            amount: paymentTransaction.amount,
            paymentMode: paymentTransaction.paymentMode,
          };

          this.recordPaymentTransaction(transaction);
        },
      },
      ignoreBackdropClick: true,
    };
    this.modalService.show(SettleUpComponent, options);
  }

  public recordPaymentTransaction(paymentTransaction: any): void {
    this.groupService.recordPayment(this.groupId, paymentTransaction).subscribe({next: (data)=>{
      console.log(data);
      if(data) {
        this.fetchGroupBalances();
      }
    }, error: (err)=>{
      
    }});
  }

}
