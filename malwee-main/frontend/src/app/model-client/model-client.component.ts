import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  nomeFantasia: string;
  idCliente: number;
  cnpj : string;
  razaoSocial : string;
  dataClient : Date;
}
@Component({
  selector: 'app-model-client',
  templateUrl: './model-client.component.html',
  styleUrls: ['./model-client.component.scss']
})
export class ModelClientComponent implements OnInit {
  divs: number = 0;
  clients  : Array<any> = [];
  razao : string = '';
  nomeFantasia : string = '';
  cnpj : string = '';
  startDate : Date = new Date(2022, 0, 1);

  constructor(public dialogRef: MatDialogRef<ModelClientComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idCliente: number, nomeFantasia : string,
       cnpj : string, razaoSocial : string, dataClient : Date}) { }

  ngOnInit(): void {
    if(this.data.idCliente == null){
      this.divs = 2
    }else{
      this.divs = 1
    }
    if (!this.data){
      return;
    }
  }

  async putItens(){
    this.clients = await this.httpService.put('client', {nomeFantasia : this.nomeFantasia, idCliente : this.data.idCliente, razaoSocial : this.razao});
    this.onNoClick();
  }

  async postClient(){
    this.clients = await this.httpService.post('client',{nomeFantasia : this.nomeFantasia, razaoSocial : this.razao,
    cnpj : this.cnpj, dataCliente : this.startDate})
    this.onNoClick()
  }

  async deleteItens(){
    console.log('foi')
    this.clients = await this.httpService.patch('client', {idCliente : this.data.idCliente})
    this.onNoClick()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
