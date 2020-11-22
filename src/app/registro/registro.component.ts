import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth.service';

import { UsuarioService} from "../servicios/usuario";
import { Comercio } from "../modelos/comercio";
import { Persona } from "../modelos/persona";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService], 
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  public comercio : Comercio;
  public persona: Persona;
  
  public identity;
  public loginInvalid;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _usuarioServicio:UsuarioService,
    // private authService: AuthService
  ) {
    this.comercio = new Comercio(0,'','','','','','','','');
  }

  async ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
    // this.identity = this._usuarioServicio.getIdentity();

    this.form = this.fb.group({
      cuit: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.email],
      direccion: ['', Validators.required],
    });

    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  async onRegistraComercio() {
    if (this.form.valid) {
      try {
        const cuit = this.form.get('cuit').value;
        const nombre = this.form.get('nombre').value;
        const apellido = this.form.get('apellido').value;
        const telefono = this.form.get('telefono').value;
        const email = this.form.get('email').value;
        const direccion = this.form.get('direccion').value;

        this.comercio = new Comercio(0,nombre,apellido,cuit,telefono,email,direccion,'','');

        this._usuarioServicio.addComercio(this.comercio).toPromise().
          then((data:any) => {
            if (!data){
              //SINO TRAE DATOS...
              console.log('error');
            }else{
              if (data.sql.affectedRows = 0){
                console.log('Ocurrio algo inesperado, reintete por favor.');
              }else{
                alert('Registro correcto! Recibirá un correo electrónico con la información para el acceso a la web.');
                this.comercio = new Comercio(0,'','','','','','','','');
                this.router.navigate(['/']);
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
