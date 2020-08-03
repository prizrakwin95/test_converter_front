import { Injectable } from '@angular/core';
import {TransportService} from './transport.service';
import {DataService} from './data.service';
import {History, User} from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  name:string = '';
  password:string = '';

  constructor(private transportService: TransportService,private dataService: DataService) { }
  getToken(userName:string,userPass:string): any{
    this.name = userName;
    this.password = userPass;
    const body = {
      name : this.name,
      password: this.password
    };
    return this.transportService.post('users/auth',body,{'Content-type':'application/json; charset=utf-8'});
  }

   getCursToday(){
    return this.transportService.get('valutes/today',{'Content-type':'application/json; charset=utf-8'});
  }

  async putHistory(history: History){
    history.user = new User();
    history.user.name = this.name;
    history.user.password = this.password;
    await this.transportService.put('history/add',history,{'Content-type':'application/json; charset=utf-8'}).toPromise();
  }

  getHistory():any{
    const body = {
      name: this.name,
      password: this.password
    };
    return this.transportService.post('history/',body,{'Content-type':'application/json; charset=utf-8'});
  }

  async putUser(userName:string,userPass:string){
    const body = {
      name: userName,
      password: userPass
    };
    this.dataService.token = await this.transportService.put('users/add',body,{'Content-type':'application/json; charset=utf-8'}).toPromise();
  }



}
