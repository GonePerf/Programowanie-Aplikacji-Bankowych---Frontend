import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService, Client } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BankiFrontend';
  history = false;
  login = false;
  transfer = false;
  loggedIn = false;
  @Input()
  client: Client;
  constructor(private api: ApiService){}

  ngOnInit(): void {

  }

  emited(client: Client){
    this.client = client;
    this.actionTransfer();
    this.loggedIn = true;
  }

  logout(){
    this.client = null;
    this.loggedIn = false;
    this.actionLogin();
  }

  actionHistory(){
    this.login = false;
    this.transfer = false;
    this.history = !this.history;
  }
  actionLogin(){
    this.history = false;
    this.transfer = false;
    this.login = !this.login;
  }
  actionTransfer(){
    this.history = false;
    this.login = false;
    this.transfer = !this.transfer;
  }
}
