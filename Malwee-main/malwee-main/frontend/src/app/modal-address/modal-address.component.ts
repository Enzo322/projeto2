import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
  numero: number;
  cep : number;
}
@Component({
  selector: 'app-modal-address',
  templateUrl: './modal-address.component.html',
  styleUrls: ['./modal-address.component.scss']
})
export class ModalAddressComponent implements OnInit {

  cep : number = 0;
  rua  : string = '';
  bairro : string = '';
  cidade : string = '';
  estado : string = '';
  complemento : string = '';
  numero : number = 0;

  enderecos : Array<any> = [];
  endereco : string = '';
  fkCliente : number = 0;
  constructor(public dialogRef: MatDialogRef<ModalAddressComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idCliente: number}) { }

  ngOnInit(): void {
    console.log(this.data.idCliente)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  async postAddress(){
    this.enderecos = await this.httpService.post('client',{rua : this.rua,bairro : this.bairro,
      cidade : this.cidade, estado : this.estado, complemento : this.complemento, numero : this.numero, fkCliente : this.data.idCliente});
    this.onNoClick();
  }
}
