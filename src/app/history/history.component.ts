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
  isMain = false;
  history: Observable<Transfer[]>;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if(this.client.email == 'bankb@xd.pl'){
      this.history = this.api.getAllHistory();
      this.isMain = true;
      
    }
    else{
      this.history = this.api.getHistory(this.client.account_id);
    }
      
  }
  showTranswerType(a: string){
    if(a == 'Obciążenie'){
      return true;
    }
    else {
      return false;
    }
  }

}
