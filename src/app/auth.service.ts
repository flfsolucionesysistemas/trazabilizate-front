import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import OktaAuth from '@okta/okta-auth-js';


import { UsuarioService } from "../app/servicios/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private authClient = new OktaAuth({
  //   issuer: 'https://dev-133320.okta.com/oauth2/default',
  //   clientId: '0oa2atheooXCVENi4357'
  // });

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private _usuarioServicio:UsuarioService) {
  }

  async checkAuthenticated() {
    // const authenticated = await this.authClient.session.exists();

    const authenticated = this._usuarioServicio.getIdentity();
    if (authenticated){
      this.isAuthenticated.next(authenticated);
      return authenticated;
    }

  }

  async login() {
    // const transaction = await this.authClient.signIn({username, password});

    // if (transaction.status !== 'SUCCESS') {
    //   throw Error('We cannot handle the ' + transaction.status + ' status');
    // }
    this.isAuthenticated.next(true);

    // this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string) {
    try {
      // await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
