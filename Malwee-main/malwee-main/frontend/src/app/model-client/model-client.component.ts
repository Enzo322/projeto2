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

  rua: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  complemento: string = '';
  numero: number = 0;
  cep : number = 0;
  enderecos : Array<any> = [];
  endereco : string = '';

  constructor(public dialogRef: MatDialogRef<ModelClientComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idCliente: number, nomeFantasia : string,
       cnpj : string, razaoSocial : string, dataClient : Date}, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.getAddress())
    console.log(this.data.idCliente)
    if(this.data.idCliente == null){
      this.divs = 2
    }else{
      this.divs = 1
    }
    if (!this.data){
      return;
    }
  }
//-------------put-------------------
  async putCliente(){
    this.clients = await this.httpService.put('client', {nomeFantasia : this.nomeFantasia, idCliente : this.data.idCliente, 
      razaoSocial : this.razao});
    this.onNoClick();
  }

  async putAddress(){
    this.clients = await this.httpService.put('client', {rua :this.rua, bairro :this.bairro, cidade :this.cidade,
       estado :this.estado, cep :this.cep, numero :this.numero, complemento :this.complemento, fkCliente : this.data.idCliente})
  }
//---------post-------------
  async postClient(){
    this.clients = await this.httpService.post('client',{nomeFantasia : this.nomeFantasia, razaoSocial : this.razao,
    cnpj : this.cnpj, dataCliente : this.startDate, address: this.enderecos})
    this.onNoClick()
  }

  async addEndereco(){ 
    this.enderecos.push({'rua' :this.rua, 'bairro' :this.bairro, 'cidade' :this.cidade, 'estado':this.estado,
      'cep' :this.cep, 'numero' :this.numero, 'complemento' :this.complemento})
      console.log(this.enderecos);
      this.reset();
  }
//----------delete----------------
  async deleteItens(){
    console.log('foi')
    this.clients = await this.httpService.patch('client', {idCliente : this.data.idCliente})
    this.onNoClick()
  }
//----get-------------
async getAddress(){
  this.enderecos = await this.httpService.get(`client/${this.data.idCliente}`);
}
//--------funções alternativas----------
  onNoClick(): void {
    this.dialogRef.close();
  }
  reset(){
    this.rua          = '';
    this.bairro       = '';
    this.cidade       = '';
    this.estado       = '';
    this.complemento  = '';
    this.numero       = 0;
    this.cep          = 0;
  }

}
