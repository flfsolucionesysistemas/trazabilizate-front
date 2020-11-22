import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { UsuarioService} from "../servicios/usuario";
import { Comercio } from "../modelos/comercio";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService], 
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  public comercio : Comercio;
  public identity;
  public isAuthenticated;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _usuarioServicio:UsuarioService,
    private authService: AuthService
  ) {
    this.comercio = new Comercio(0,'','','','','','','','');
  }

  async ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
    // this.identity = this._usuarioServicio.getIdentity();

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    if (await this.authService.checkAuthenticated()) {
      await this.router.navigate(['/scan']);
    }
  }

  async onSubmit() {

    
    // this.identity = '{USUARIO:cristian,CIUDAD:concordia}';
    // localStorage.setItem('identity', JSON.stringify(this.identity));          
    
    // this.authService.login();
    // this.router.navigate(['/scan']);

  //   this.loginInvalid = false;
  //   this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.comercio = new Comercio(0,'','','','','','',username,password);

        this._usuarioServicio.login(this.comercio).toPromise().
          then((data:any) => {
            if (!data){
              //SINO TRAE DATOS...
              console.log('error');
            }else{
              let identity = data;
              this.identity = identity;
              
              if(!this.identity.id_comercio){
                alert("El comercio no está correctamente logueado");
                console.log('error');
              }else{
                this.isAuthenticated = this.authService.checkAuthenticated();

                this.router.navigate(['/scan']);
                localStorage.setItem('identity', JSON.stringify(identity));          
                this.comercio = new Comercio(0,'','','','','','','','');
              }
            }
          }
        );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
