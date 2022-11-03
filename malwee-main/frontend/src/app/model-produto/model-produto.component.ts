import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelSubComponent } from '../model-sub/model-sub.component';
export interface DialogData {
  descricao: string;
  fkGroup : number;
  fkSub : number;
  fkColecao : number;
  
}
@Component({
  selector: 'app-model-produto',
  templateUrl: './model-produto.component.html',
  styleUrls: ['./model-produto.component.scss']
})
export class ModelProdutoComponent implements OnInit {
  preco : number = 0;
  produto : string = '';
  produtos : Array<any> = [];

  grupo : string = '';
  grupos : Array<any> = []; 

  subGrupo : string = '';
  subGrupos : Array<any> = [];

  colecao : string = '';
  colecoes : Array<any> = [];

  divs : number = 0;

  selectedGroup1 = 0;
  selectedGroup2 = 0;
  selectedGroup3 = 0;

  constructor(public dialogRef: MatDialogRef<ModelProdutoComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idProduto: number, descricao : string, preco : Number}) { }

  ngOnInit(): void {
    this.getItens();
    if(this.data.idProduto == null){
      this.divs = 2
    }else{
      this.divs = 1
    }
    if (!this.data){
      return;
    }

  }

  async putItens(){
    this.produtos = await this.httpService.put('product', {descricao : this.produto, idProduto : this.data.idProduto, preco : this.preco});
    this.onNoClick()
  }

  async postProduct(){
    this.produtos = await this.httpService.post('product',{descricao : this.produto, preco : this.preco, 
      fkSubGrupo : this.selectedGroup2, fkGrupo : this.selectedGroup1, fkColecao : this.selectedGroup3});
      this.onNoClick()
  }

  async deleteItens(){
    this.produtos = await this.httpService.patch('product', {idProduto: this.data.idProduto})
    this.onNoClick()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async getItens(){
    this.grupos = await this.httpService.get('group');
    this.subGrupos = await this.httpService.get('subGroup');
    this.colecoes = await this.httpService.get('colection');
  }
}
