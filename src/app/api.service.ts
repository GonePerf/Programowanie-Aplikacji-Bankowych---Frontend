import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = ' http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  addClient(client: NewClient){
    return this.http.post<NewClient>(`${this.baseUrl}/client`, client);
  }
  login(email: string): Observable<Client>{
    return this.http.get<Client>(`${this.baseUrl}/account/${email}`);
  }
  deposit(form){
    return this.http.post<Deposit_Withdraw>(`${this.baseUrl}/account/deposit`, form)
  }
  withdraw(form){
    return this.http.post<Deposit_Withdraw>(`${this.baseUrl}/account/withdraw`, form)
  }
  newTransfer(transfer: NewTransfer){
    return this.http.post<NewTransfer>(`${this.baseUrl}/transaction/send-transfer`, transfer)
  }
  getHistory(id: number){
    return this.http.get<Transfer[]>(`${this.baseUrl}/transaction/account/${id}`);
  }

  synchronize(){
    return this.http.get<Transfer[]>(`${this.baseUrl}/transaction/synchronization-with-the-accounting-unit`);
  }

}
export class Deposit_Withdraw{
  account_id: number
  amount: number
}
export class NewClient{
  email: string
  name_and_address: string
  phone_number: string
}
export class Client{
  id?: number
  account_id: number
  account_number: string
  balance: number
  client_id: number
  email: string
  name_and_address: string
  phone_number: string
  error?: string = null
}

export class NewTransfer{
  id?: number
  account_id: number
  recipient_name_and_address: string
  recipient_number: string
  title: string
  transfer_amount: number
}
export class Transfer{
  transfer_id?: number
  name_and_address: string
  account_number: string
  title: string
  transfer_type: string
  transfer_amount: number
  transfer_date: Date
}
