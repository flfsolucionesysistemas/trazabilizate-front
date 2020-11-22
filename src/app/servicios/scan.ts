import {Injectable} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'
import { Observable, of } from "rxjs";
import {GLOBAL} from './global';
import { from } from 'rxjs';


@Injectable()
export class ScanService{
    public identity;
    public token;
    public url : string;
    
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addCheckIn(registro){
        let json = JSON.stringify(registro);
        let params = json;
        let headers = new HttpHeaders({'Content-Type':'application/json'});
      
        return this._http.post(this.url + 'registracion/addCheckIn', params, {'headers':headers});
    }
}