import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsQR, { QRCode } from 'jsqr';

import { UsuarioService} from "../servicios/usuario";
import { AuthService } from '../auth.service';

import {Registro} from '../modelos/registro';
import { ScanService } from "../servicios/scan";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: [ './scan.component.css' ],
  providers: [UsuarioService,ScanService], 
})
export class ScanComponent {
  @ViewChild('video', {static: true}) videoElm: ElementRef;
  @ViewChild('canvas', {static: true}) canvasElm: ElementRef;

  videoStart = false;
  medias: MediaStreamConstraints = {
    audio: false,
    video: false,
  };

  public registro: Registro;
  public identity;
  isAuthenticated: boolean;

  constructor(
    public authService: AuthService,
    // public dialog: MatDialog,
    private _usuarioServicio:UsuarioService,
    private _scanServicio :ScanService,
  ) { 
    this.registro = new Registro(0,'');
  }

  
  
  ngOnInit() {
    this.identity = this._usuarioServicio.getIdentity();
    console.log(this.identity);
    if (this.identity){
      this.isAuthenticated = true;
    }else{
      this.isAuthenticated = false;
    }
  
    // this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  toggleVideoMedia() {
    // alert('cdf'); 
    if (this.videoStart) {
      this.stopVideo();
    } else {
      this.startVideo()
    }
    // this.videoStart ? this.stopVideo() : this.startVideo()
  }

  startVideo() {
    this.medias.video = true;
    navigator.mediaDevices.getUserMedia(this.medias).then(
      (localStream: MediaStream) => {
        this.videoElm.nativeElement.srcObject = localStream;
        this.videoStart = true;
        this.checkImage();
      }
    ).catch(
      error => {
        console.error(error);
        this.videoStart = false;
      }
    );
  }

  stopVideo() {
    this.medias.video = false;
    this.videoElm.nativeElement.srcObject.getVideoTracks()[0].enabled = false;
    this.videoElm.nativeElement.srcObject.getVideoTracks()[0].stop();
    this.videoStart = false;
  }

  checkImage() {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;
    this.canvasElm.nativeElement.width  = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    const ctx = this.canvasElm.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT)
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
    const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" })

    if (code) {
      // this.openDialog(code);
      // alert(code.binaryData);
      // alert(code.data);

      this.registro.id_comercio = 1;
      this.registro.qrcode = code.data;
      alert(this.registro.qrcode);

      this._scanServicio.addCheckIn(this.registro).toPromise().
        then((data:any) => {
          if (!data){
            //SINO TRAE DATOS...
            console.log('error');
          }else{
            if (data.sql.affectedRows = 0){
              console.log('Ocurrio algo inesperado, reintete por favor.');
            }else{
              alert('El ingreso se completo OK!');
              this.registro = new Registro(0,'');
              // this.router.navigate(['/']);
            }
          }
        }
      );
    } else {
        setTimeout(() => { this.checkImage(); }, 100)
    }
  }

  // openDialog(code: QRCode): void {
  //   alert(code.data);

  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '360px',
  //     data: {qrcode: code}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.checkImage();
  //   });
  // }

}


// @Component({
//   selector: 'dialog-component',
//   templateUrl: 'dialog-component.html',
//   styleUrls: [ './dialog-component.css' ]
// })
// export class DialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: QRCode
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }