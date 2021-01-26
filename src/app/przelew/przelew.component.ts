import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Client, NewTransfer } from '../api.service';

@Component({
  selector: 'app-przelew',
  templateUrl: './przelew.component.html',
  styleUrls: ['./przelew.component.css']
})
export class PrzelewComponent implements OnInit {

  @Input()
  client: Client;

  error: string;
  recipient_address: string;
  recipient_name: string;
  recipient_number: string;
  title: string;
  transfer_amount: number;

  constructor(public api: ApiService) { }

  ngOnInit(): void {

  }
  isValid(){
    if(this.recipient_address == null || this.recipient_name == null || this.recipient_number == null || this.title == null || this.transfer_amount == null){
      return false;
    }
    else{
      return true;
    }
  }

  sendTransfer(){
    if(this.isValid()){
      let transfer = new NewTransfer;
      transfer.account_id = this.client.account_id;
      transfer.recipient_name_and_address = this.recipient_name + ' ' + this.recipient_address;
      transfer.recipient_number = this.recipient_number;
      transfer.title = this.title;
      transfer.transfer_amount = this.transfer_amount;
      this.error = '';
      return this.api.newTransfer(transfer).subscribe(
        () => {alert('Wysłano pomyślnie');
          this.client.balance -= transfer.transfer_amount;
          this.recipient_address = '';
          this.recipient_name = '';
          this.recipient_number = '';
          this.transfer_amount = null;
          this.title = '';
        },
        err => this.error = 'Błąd',
      );
    }
    else{
      this.error = 'Wprowadzono błędne dane!';
    }



  }
}
