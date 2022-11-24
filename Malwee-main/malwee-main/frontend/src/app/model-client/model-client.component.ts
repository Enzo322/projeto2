import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { CepServiceService } from './cep-service.service';
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

  logradouro: string = '';
  bairro: string = '';
  localidade: string = '';
  uf: string = '';
  complemento: string = '';
  numero: number = 0;
  cep : number = 0;
  enderecos : Array<any> = [];
  endereco : string = '';

  selectedGroup: number = 0;

  constructor(public dialogRef: MatDialogRef<ModelClientComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idCliente: number, nomeFantasia : string,
       cnpj : string, razaoSocial : string, dataClient : Date}, public dialog: MatDialog, private cepService : CepServiceService) { }

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

  consultaCep(){
    this.cepService.buscar(String(this.cep)).subscribe((dados) => this.populaForm(dados));
  }

  populaForm(dados : any){
   this.cep = dados.cep,
   this.logradouro = dados.logradouro,
   this.bairro = dados.bairro,
   this.localidade = dados.localidade,
   this.uf = dados.uf
  }
//-------------put-------------------
  async put(){
    this.putAddress();

    if(this.nomeFantasia == ''){
      this.nomeFantasia = this.data.nomeFantasia;
    }

    if(this.razao == ''){
      this.razao = this.data.razaoSocial;
    }

    this.clients = await this.httpService.put('client',{nomeFantasia : this.nomeFantasia, razaoSocial : this.razao,
      address: this.enderecos, idCliente: this.data.idCliente})

    this.onNoClick();
  }

  async putAddress(){
    this.enderecos.push({logradouro :this.logradouro, bairro :this.bairro, localidade :this.localidade,
       uf :this.uf, cep :this.cep, numero :this.numero, complemento :this.complemento, idEndereco : this.selectedGroup})
  }
//---------post-------------
  async postClient(){
    this.clients = await this.httpService.post('client',{nomeFantasia : this.nomeFantasia, razaoSocial : this.razao,
    cnpj : this.cnpj, dataCliente : this.startDate, address: this.enderecos})
    this.onNoClick()
  }

  async addEndereco(){ 
    this.enderecos.push({'logradouro' :this.logradouro, 'bairro' :this.bairro, 'localidade' :this.localidade, 'uf' :this.uf,
      'cep' :this.cep, 'numero' :this.numero, 'complemento' :this.complemento})
      console.log(this.enderecos);
      this.reset();
  }
//----------delete----------------
  async deleteItens(){
    this.clients = await this.httpService.patch('client', {idCliente : this.data.idCliente})
    this.onNoClick()
  }
  async deleteAddress(){
    this.enderecos = await this.httpService.patch('client',{idEndereco : this.selectedGroup});
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
    this.logradouro   = '';
    this.bairro       = '';
    this.localidade       = '';
    this.uf           = '';
    this.complemento  = '';
    this.numero       = 0;
    this.cep          = 0;
  }

}
