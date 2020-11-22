import {Injectable} from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators'
import { Observable, of } from "rxjs";
import {GLOBAL} from './global';
import { from } from 'rxjs';


@Injectable()
export class UsuarioService{
    public identity;
    public token;
    public url : string;
    
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    login(user_to_login, gethash = null){
        if(gethash != null){
            user_to_login.gethash = gethash;
        }

        let json = JSON.stringify(user_to_login);
        let params = json;
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        
        return this._http.post(this.url + 'users/userLogin', params, {'headers':headers});
    }

    addPersona(persona){
        let json = JSON.stringify(persona);
        let params = json;
        let headers = new HttpHeaders({'Content-Type':'application/json'});
      
        return this._http.post(this.url + 'users/addPersona', params, {'headers':headers});
    }

    addComercio(comercio){
        let json = JSON.stringify(comercio);
        let params = json;
        let headers = new HttpHeaders({'Content-Type':'application/json'});
      
        return this._http.post(this.url + 'users/addcomercio', params, {'headers':headers});
    }

    //OBTIENE LA SESION GUARDA
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    //OBTIENE EL TOKEN DEL USUARIO LOGUEADO
    getToken(){
        let token = localStorage.getItem('token');
        
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
}