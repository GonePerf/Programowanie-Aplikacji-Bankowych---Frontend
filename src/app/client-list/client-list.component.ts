import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Client } from '../api.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private api: ApiService) { }

  clients: Observable<Client[]>;

  ngOnInit(): void {
    this.clients = this.api.getAllClients();
  }

}
