import {Component, Input, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {RequestService} from './services/request.service';
import {ValCurs, Valutes} from './models/models';
// import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    this.appValcurs = await this.requestService.getCursToday().toPromise();

  }
  title = 'Converter';
  appTitle = 'Вход';
  isAutorize = true;
  appValcurs: ValCurs;
  @Input() appValutes: Valutes[]

  autorize(event: boolean): void{
     this.isAutorize = event;
   }
   constructor(public dataService: DataService, private requestService:RequestService){

   }

}

