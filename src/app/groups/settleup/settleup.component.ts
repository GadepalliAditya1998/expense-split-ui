import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'settleup',
  templateUrl: './settleup.component.html',
})
export class SettleUpComponent implements OnInit{
  public formGroup: FormGroup = new FormGroup({});
  paymentModes = [
    { name: 'Cash', value: 0 },
    { name: 'UPI', value: 1 },
    { name: 'bank Transfer', value: 2 },
    { name: 'Cheque', value: 3 },
  ];

  public balance: any = {};

    constructor(public modalRef: BsModalRef) {
    }

    ngOnInit(): void {
        console.log(this.balance);
        this.formGroup = new FormGroup({
            amount: new FormControl(this.balance?.amount || null, Validators.required),
            paymentMode: new FormControl(this.balance?.paymentMode || this.paymentModes[0].value, Validators.required),
            paidToUserId: new FormControl(this.balance?.paidToUser.id || null),
            paidByUserId: new FormControl(this.balance?.paidByUser.id || null),
          });
    }

    public savePaymentTransaction() : void{
        if(this.formGroup.valid && this.modalRef.content.onPayment) {
            this.modalRef.content.onPayment(this.formGroup.value);
            this.modalRef.hide();
        }
    }
}
