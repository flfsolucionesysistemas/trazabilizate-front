import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth.service';

import { UsuarioService} from "../servicios/usuario";
import { Persona } from "../modelos/persona";

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css'],
  providers: [UsuarioService], 
})
export class RegistroPersonaComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

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
    this.persona = new Persona(0,'','','','','','','',0);
  }

  async ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
    // this.identity = this._usuarioServicio.getIdentity();

    this.form = this.fb.group({
      dni: ['', Validators.required],
      tramite: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.email],
    });

    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  async onRegistraPersona() {
    if (this.form.valid) {
      try {
        const dni = this.form.get('dni').value;
        const tramite = this.form.get('tramite').value;
        const nombre = this.form.get('nombre').value;
        const apellido = this.form.get('apellido').value;
        const telefono = this.form.get('telefono').value;
        const email = this.form.get('email').value;

        this.persona = new Persona(0,nombre,apellido,dni,tramite,'',telefono,email,0);

        this._usuarioServicio.addPersona(this.persona).toPromise().
          then((data:any) => {
            if (!data){
              //SINO TRAE DATOS...
              console.log('error');
            }else{
              if (data.sql.affectedRows = 0){
                console.log('Ocurrio algo inesperado, reintete por favor.');
              }else{
                alert('Registro correcto! Recibirá un correo electrónico con su QR.');
                this.persona = new Persona(0,'','','','','','','',0);
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
