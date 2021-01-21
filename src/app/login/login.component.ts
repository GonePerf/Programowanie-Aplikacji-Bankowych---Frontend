import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService, Client, NewClient } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  obs_client: Observable<Client>;
  @Output() client = new EventEmitter<Client>();
  loginError: string = '';
  registerError: string = '';

  emailLog: string;


  adres: string;
  emailReg: string;
  name: string;
  tel: string;

    
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  isValid(){
    if(this.adres == null || this.emailReg == null || this.name == null || this.tel == null){
      return false;
    }
    else{
      return true;
    }
  }

  onRegister(){
    if(this.isValid() && (this.tel.toString().length == 9)){
      let newClient = new NewClient;
      newClient.address = this.adres;
      newClient.email = this.emailReg;
      newClient.name = this.name;
      newClient.phone_number = this.tel;
      return this.api.addClient(newClient).subscribe(
        () => alert('Konto założone pomyślnie'),
        err => this.registerError = 'Wprowadzono błędne dane!', 
      );
    }else{
      this.registerError = 'Wprowadzono błędne dane!'
    }
  }

  onLogin(){
    // let zalogowany = new Client;
    // zalogowany.id = 1;
    // zalogowany.account_id = 1;
    // zalogowany.account_number = '93103021760501257137600238';
    // zalogowany.address = 'Warszawa';
    // zalogowany.balance = 100;
    // zalogowany.client_id = 1;
    // zalogowany.email = 'janek@dw.sd';
    // zalogowany.name = 'Jan Kowalski';
    // zalogowany.phone_number = '123456789';
    // alert('Pomyślnie zalogowano');
    // this.client.emit(zalogowany);
    if(this.emailLog == null){
      alert('Wprowadź email!')
    } else{
      this.obs_client = this.api.login(this.emailLog);
      let zalogowany = new Client;
      try{
        this.obs_client.subscribe(data => zalogowany = data, err => alert('Nie znaleziono użytkownika'));
        if(zalogowany.name != null){
          alert('Pomyślnie zalogowano');
          this.client.emit(zalogowany);
        }
      }catch(error){
        alert('Błąd!')
      }
      
    }
    
  }

}
