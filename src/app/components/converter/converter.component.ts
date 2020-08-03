import {Component, EventEmitter, OnInit, Output, Input, LOCALE_ID} from '@angular/core';
import {AppComponent} from '../../app.component';
import {LoginComponent} from '../login/login.component';
import {RequestService} from '../../services/request.service';
import {History, ValCurs, Valutes} from '../../models/models';
import {DataService} from '../../services/data.service';
import {formatDate, formatNumber} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent implements OnInit {
  selected1: Valutes;
  selected2: Valutes;
  value1: string = "0";
  value2: string = "0";
  firstValuteValue: number = 0;
  secondValuteValue: number = 0;
  quantity: number = 1;
  columnsToDisplay = ['valute1','valute2','sum','cel-sum','date'];
  history : History = new History();
  dateToday: string = "";
  valueResult: number = 0;
  appTitle = 'Конвертер Валют';
  exitLogin: boolean = true;
  historyList: History[] = [];
  dataSource = new MatTableDataSource(this.historyList);

  @Input() conValcurs : ValCurs;
  @Output() isAutorize = new EventEmitter<boolean>();

  constructor(public app: AppComponent, private requestService: RequestService,public dataService:DataService) {
    app.appTitle = this.appTitle;
  }

  exit(){
    console.log('EXIT');
    this.isAutorize.emit(true);
  }

  getDefault(){
    for (let valutes of this.conValcurs.valutes) {
      if(valutes.charCode == "RUB"){
        this.selected1 = valutes;
        this.firstValuteValue = valutes.value;
      }
      if(valutes.charCode == "USD"){
        this.selected2 = valutes;
        this.secondValuteValue = valutes.value;
      }
    }
  }

  editValue1(){
    this.value1 = String(this.selected1.value);
    this.firstValuteValue = this.selected1.value;
  }
  editValue2(){
    this.value2 = String(this.selected2.value);
    this.secondValuteValue = this.selected2.value
  }

  getResult(){
    if(this.firstValuteValue == 0){
      this.firstValuteValue = Number(this.value1);
    }
    if(this.secondValuteValue == 0){
      this.secondValuteValue = Number(this.value2);
    }
    this.valueResult = (1/ this.secondValuteValue* this.firstValuteValue)*this.quantity;
    this.update()
  }
  update(){
    this.history = new History();
    this.history.firstSum = this.quantity
    this.history.firstValute = this.selected1.charCode+" ("+this.selected1.name+")"
    this.history.secondValute = this.selected2.charCode+" ("+this.selected2.name+")"
    this.dateFormat(new Date())
    this.history.date = this.dateToday;
    this.history.resultSum = this.valueResult;
    this.historyList.push(this.history)
    this.dataSource = new MatTableDataSource(this.historyList);
    this.requestService.putHistory(this.history)
  }

  dateFormat(date: Date){
    this.dateToday = "";
    if(date.getDate() < 10){
      this.dateToday+="0"+String(date.getDate()+'.');
    }else{
      this.dateToday+=date.getDate()+'.';
    }
    if(date.getMonth()+1<10){
      this.dateToday+='0'+(date.getMonth()+1)+'.'
    }else {
      this.dateToday+=(date.getMonth()+1)+'.'
    }
    this.dateToday+=date.getFullYear()
  }
  
  async ngOnInit() {
    this.historyList = await this.requestService.getHistory().toPromise();
    console.log("HISTORY = ",this.historyList)
    this.dataSource = new MatTableDataSource(this.historyList);
    this.getDefault();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

