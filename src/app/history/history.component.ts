import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, Client, Transfer } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input()
  client: Client;
  
  history: Observable<Transfer[]>;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if(this.client){
      this.history = this.api.getHistory(this.client.id);
    }
  }

}
