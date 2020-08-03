import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransportService {


  constructor(private http: HttpClient) {
  }

  get(requestUrl: string, request: any):any{
    return this.http.get(environment.baseUrl+requestUrl,request);
  }
  post(requestUrl: string, request: any,headers? : {[key:string]:string}): any{
    return this.http.post( environment.baseUrl+requestUrl,request,headers);
  }
  put(requestUrl: string, request: any,headers? : {[key:string]:string}): any{
    return this.http.put( environment.baseUrl+requestUrl,request,headers);
  }

}
