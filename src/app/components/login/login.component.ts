import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {DataService} from '../../services/data.service';
import {TransportService} from '../../services/transport.service';
import {getToken} from 'codelyzer/angular/styles/cssLexer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() isAutorize = new EventEmitter<boolean>();
  userName: string;
  userPass: string;
  confirmPass: string;
  tmp: string;

  constructor(private requestService: RequestService, public dataService: DataService) {
    this.tmp = "";
  }

  async addUser(){
    if(this.userPass == this.confirmPass){
      console.log("Пароли совпали")
      this.requestService.putUser(this.userName,this.userPass);
      console.log("TOKEN = "+this.dataService.token)
      this.getToken();
    }else{
      this.tmp = "Пароли не совпадают."
      console.log("Не совпали пароли")
    }
  }
  async getToken(){
    this.tmp = ""
    console.log(this.userName+' = '+this.userPass);
    try {
      this.dataService.token = await this.requestService.getToken(this.userName, this.userPass).toPromise();
    }catch (e) {
      this.tmp = "Не удалось войти, возможно не верные логин и пароль."
    }
    console.log("TOKEN = "+ this.dataService.token)
    if(this.dataService.token == "OK"){
      this.isAutorize.emit(false);
    }
  }

  ngOnInit(): void {
  }

}
