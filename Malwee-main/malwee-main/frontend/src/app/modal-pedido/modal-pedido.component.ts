import { Component, Inject, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss']
})
export class ModalPedidoComponent implements OnInit {

  startDate : Date = new Date(2022, 1, 1);
  lastDate : Date = new Date(2022, 1, 1);
  nomeFantasia : string = '';
  fkClientes : any
  cliente : string = '';
  clientes : Array<any> = [];
  Endereco : Array<any> = [];
  enderecos : string = '';
  pedidos : Array<any> = [];
  logradouro : string = '';
  fkEndereco : number = 0;
  selectedGroup : number = 0;
  produtos : Array<any> = [];
  qtd : number = 1;
  prod  :string = '';
  idProd : number = 0
  constructor(public dialogRef: MatDialogRef<ModalPedidoComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idCliente: number, nomeFantasia : string,
       cnpj : string, razaoSocial : string, dataClient : Date}, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listaClientes();
    this.listaEndereco();
    this.listaProduto();

  }

  onNoClick(){
    this.dialogRef.close();
  }

  public addNomeFantasia(name: string, id: number){
    console.log(id)
    this.nomeFantasia=name;
    this.fkClientes=id;
    console.log(this.fkClientes);
    this.listaEndereco();
  }
  
  async listaClientes(){
    this.clientes= await this.httpService.get('client');
    console.log(this.clientes);
  }

  async listaProduto(){
    this.produtos = await this.httpService.get(`product/${this.qtd}`);
    console.log(this.produtos); 
  }
  async listaEndereco(){
    this.Endereco= await this.httpService.get(`client/${this.fkClientes}`);
    console.log(this.Endereco);
  
  }
    
  addEndereco(logradouro: string, id: number){
    this.logradouro  = logradouro;
    this.fkEndereco  = id;
    }
  async addProduto(descricao: string, idProduto: number){
    this.prod  = descricao;
    this.idProd = idProduto;
    this.produtos = await this.httpService.get(`product/${idProduto}`);

    }
    async PedidoAdd(){
    console.log("Sub-grupo adicionado");
    console.log(this.lastDate);
    this.pedidos = await this.httpService.post('pedido', {dtEmissao: this.startDate, dtEntrega: this.lastDate });
    this.dialogRef.close();
    }
    
}
