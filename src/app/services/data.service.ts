import {Inject, Injectable} from '@angular/core';
import {ValCurs} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  valcurs = new ValCurs();
  respons: string = '';
  token: string = '';
  constructor() { }
}
