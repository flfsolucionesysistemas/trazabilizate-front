import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { UsuarioService } from "./servicios/usuario";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService,UsuarioService]
})
export class AppComponent implements OnInit {
  title = 'Trazabilidad';
  isAuthenticated: boolean;
  public identity;

  constructor(
      public authService: AuthService,
      private router: Router,
      private _usuarioServicio:UsuarioService) 
    {
      this.identity = this._usuarioServicio.getIdentity();
      if (this.identity){
        this.isAuthenticated = true;
      }else{
        this.isAuthenticated = false;
      }
      
      // this.authService.isAuthenticated.subscribe(
      //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
      // );
  }

  async ngOnInit() {
    if (this.identity){
      this.isAuthenticated = true;
    }else{
      this.isAuthenticated = false;
    }
  
    // this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('identity');
    localStorage.clear;
    this.identity = null;    
    // this.router.navigate(['/']);
    this.authService.logout('/');

  }
}
