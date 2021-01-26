import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Client, Deposit_Withdraw } from '../api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input()
  client: Client;

  withdrawInfo = '';
  depositInfo = '';

  public depositAmount: Deposit_Withdraw;
  public withdrawAmount: Deposit_Withdraw;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.depositAmount = new Deposit_Withdraw;
    this.withdrawAmount = new Deposit_Withdraw;
  }

  deposit(){

    this.depositAmount.account_id = this.client.account_id;
    if(this.depositAmount.amount <= 0 || this.depositAmount.amount === undefined){
      this.depositInfo = 'Wprowadź poprawną kwotę!';
      this.withdrawInfo = '';
    }else{
      this.depositInfo = '';
      return this.api.deposit(this.depositAmount).subscribe(
        () => {
          alert('Wpłacono pomyślnie');
          this.client.balance += this.depositAmount.amount;
          this.depositAmount.amount = null;
          },
        err => alert('Błąd'),
      );
    }

  }
  withdraw(){

    this.withdrawAmount.account_id = this.client.account_id;
    if(this.withdrawAmount.amount <= 0 || this.withdrawAmount.amount === undefined){
      this.withdrawInfo = 'Wprowadź poprawną kwotę!';
      this.depositInfo = '';
    }else{
      this.withdrawInfo = '';
      return this.api.withdraw(this.withdrawAmount).subscribe(
        () => {
          alert('Wypłacono pomyślnie');
          this.client.balance -= this.withdrawAmount.amount;
          this.withdrawAmount.amount = null;
        },
        err => alert('Błąd'),
      );
    }

  }
}
