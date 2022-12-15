import { Component, Inject, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SrvRecord } from 'dns';
import * as moment from 'moment';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.component.html',
  styleUrls: ['./modal-pedido.component.scss']
})
export class ModalPedidoComponent implements OnInit {

  startDate : Date = new Date(2022, 1, 1); //data Emissão
  lastDate : Date = new Date(2022, 1, 1); //data Entrega

  nomeFantasia : string = '';
  fkClientes : any
  cliente : string = '';
  clientes : Array<any> = [];
  clientes2 : Array<any> = [];

  Endereco : Array<any> = [];
  enderecos : string = '';
  logradouro : string = '';
  fkEndereco : number = 0;
  produtoPedidos : Array<any> = [];
  pedidos : Array<any> = [];
  selectedGroup : number = 0;
  produtos : Array<any> = [];
  produtos2 : Array<any> = [];
  produtos3 : Array<any> = [];
  descricao : string = '';

  qtd : number = 0;
  prod  :string = '';
  idProd : number = 0;
  total : number = 0;
  total2 : number = 0;
  acrescimo : number = 1;
  desconto : number = 1;
  valorUnitario : number = 1;
  ghostNumber : number = 0;

  numero : number = 0;
  constructor(public dialogRef: MatDialogRef<ModalPedidoComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idPedido: number}, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.idPedido)
    if(this.data.idPedido != null){
      this.numero = 1;
    }else{
      this.numero = 2;
    }
    this.listaClientes();
    this.listaEndereco();
    this.listaProduto();
    this.listaProdutoPedido();
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
    
    this.clientes2.push({"nome" : this.nomeFantasia, "dtEmissao" : this.startDate, "dtEntrega":this.lastDate})
    this.clientes2.forEach(element =>{
      console.log("Element" + element);
      element.dtEmissao = moment(element.dtEmissao).format('DD/MM/YYYY');
      element.dtEntrega = moment(element.dtEntrega).format('DD/MM/YYYY');
    })
  }
  
  async listaClientes(){
    this.clientes= await this.httpService.get('client');
    console.log(this.clientes);
  }

  async listaProduto(){
    this.produtos = await this.httpService.get(`product/${this.ghostNumber}`);
    console.log(this.produtos); 
  }
  async listaEndereco(){
    this.Endereco= await this.httpService.get(`client/${this.fkClientes}`);
    console.log(this.Endereco);
  
  }
  async listaProdutoPedido(){
    this.produtoPedidos = await this.httpService.get(`pedido/${this.data.idPedido}`);
  
  }
  addEndereco(logradouro: string, id: number){
    this.logradouro  = logradouro;
    this.fkEndereco  = id;
  }

  async addProduto(descricao: string, idProduto: number, preco : number){
    this.prod  = descricao;
    this.idProd = idProduto;
    this.valorUnitario = preco
    this.produtos2 = await this.httpService.get(`product/${idProduto}`);

  }

  addPreco(valorUnitario : number, descricao : string){
    this.valorUnitario = valorUnitario;
    this.descricao = descricao;
    console.log(valorUnitario);
  }
  calculaTotal(){
    let descontoFinal = this.desconto/100 * this.valorUnitario;
    let aumentoFinal = this.acrescimo/100 * this.valorUnitario;
    let valorUnitarioL = this.valorUnitario - descontoFinal + aumentoFinal;
    this.total = valorUnitarioL * this.qtd;
  }
    
  adicionarArrayDePedidos(){
    this.total2 += this.total;
    this.produtos3.push({"descricao" : this.prod, "valorUnitario" : this.valorUnitario, "acrescimo" : this.acrescimo,
    "desconto" : this.desconto, "fkProduto" : this.idProd, "quantidade" : this.qtd, "totalPedido" : this.total,
    "total" : this.total2})
    console.log(this.produtos3);
    this.resetModels();
  }
  resetModels(){
    this.valorUnitario = 0;
    this.acrescimo = 1;
    this.desconto = 1;
    this.qtd = 0
    this.total = 0
  }

  async post(){
    this.pedidos = await this.httpService.post('pedido',{dtEmissao: this.startDate, dtEntrega : this.lastDate,
    fkEndereco :this.fkEndereco, fkCliente :this.fkClientes, total :this.total, produtoPedido : this.produtos3,
  })
  }

  async put(){
    this.produtos3.push({"quantidade" : this.qtd, "valorUnitario" : this.valorUnitario, "descricao" : this.descricao,
    "acrescimo" : this.acrescimo, "desconto" : this.desconto, "total" : this.total, "fkPedido" : this.selectedGroup})

    this.pedidos = await this.httpService.put('pedido',{dtEmissao : this.startDate, dtEntrega : this.lastDate, 
      produtoPedido : this.produtos3, idPedido : this.data.idPedido})
      this.onNoClick();
  }
  async delete(){
    await this.httpService.patch('pedido',{fkPedido : this.data.idPedido, idPedido : this.data.idPedido})
  }

}
