import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { ScanComponent } from './scan/scan.component';
import { RegistroComponent } from "./registro/registro.component";
import { RegistroPersonaComponent } from "./registro-persona/registro-persona.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'scan',
    component: ScanComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  { 
    path: 'registro-persona',
    component : RegistroPersonaComponent
  },
  {
    path: 'game',
    component: GameComponent,
    // canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
