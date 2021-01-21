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
    return this.http.get<Client>(`${this.baseUrl}/client/${email}`);
  }
  deposit(form){
    return this.http.post<Deposit_Withdraw>(`${this.baseUrl}/account/deposit`, form)
  }
  withdraw(form){
    return this.http.post<Deposit_Withdraw>(`${this.baseUrl}/account/withdraw`, form)
  }
  newTransfer(transfer: NewTransfer){
    return this.http.post<NewTransfer>(`${this.baseUrl}/transaction/send-transfers`, transfer)
  }
  getHistory(id: number){
    return this.http.get<Transfer[]>(`${this.baseUrl}/transaction/account/${id}`);
  }
  
}
export class Deposit_Withdraw{
  account_id: number
  amount: number
}
export class NewClient{
  address: string
  email: string
  name: string
  phone_number: string
}
export class Client{
  id?: number
  account_id: number
  account_number: string
  address: string
  balance: number
  client_id: number
  email: string
  name: string
  phone_number: string
  error?: string = null
}

export class NewTransfer{
  id?: number
  account_id: number
  recipient_address: string
  recipient_name: string
  recipient_number: string
  title: string
  transfer_amount: number
}
export class Transfer{
  transfer_id?: number
  name: string
  account_number: string
  address: string
  title: string
  transfer_type: string
  transfer_amount: number
  transfer_date: Date
}