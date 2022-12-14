import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-model-client-confirmation',
  templateUrl: './model-client-confirmation.component.html',
  styleUrls: ['./model-client-confirmation.component.scss']
})
export class ModelClientConfirmationComponent implements OnInit {
  idCliente: any;
  idEndereco: any;
  idUsuario: any;
  enderecos : Array<any> = [];
  clients  : Array<any> = [];
  constructor(public dialogRef: MatDialogRef<ModelClientConfirmationComponent>, private httpService : HttpService) { }

  
  ngOnInit(): void {
    this.idCliente = localStorage.getItem('idCliente');
    this.idEndereco = localStorage.getItem('idEndereco');
    console.log(this.idCliente);
    console.log(this.idEndereco);
  }

  async deleteItens(){ 
    if(this.idCliente == undefined || this.idCliente == null){
      console.log('entrou deletar endereço')
      this.enderecos = await this.httpService.patch('client',{idEndereco : this.idEndereco});

    }else if(this.idEndereco == undefined || this.idEndereco == null){
      console.log('entrou deletar cliente')
      this.enderecos = await this.httpService.patch('client',{idCliente: this.idCliente});

    }

    this.removeItens();
    this.onNoClick();
  }
  // async get(){
  //     this.enderecos = await this.httpService.get(`client/${this.idEndereco}`);
  //     this.clients = await this.httpService.get('client')
  // }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeItens(){
    localStorage.removeItem('idCliente');
    localStorage.removeItem('idEndereco');
    localStorage.removeItem('idUsuario');
  }
}
