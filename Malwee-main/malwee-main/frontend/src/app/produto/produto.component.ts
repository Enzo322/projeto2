import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelProdutoComponent } from '../model-produto/model-produto.component';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  search : string  = '';

  produto : string = '';
  produtos : Array<any> = [];

  grupo : string = '';
  grupos : Array<any> = []; 

  subGrupo : string = '';
  subGrupos : Array<any> = [];

  colecao : string = '';
  colecoes : Array<any> = [];

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  async get(){
    this.produtos = await this.httpService.get('product');
  }

  openModal(produto : any) : any{
    const ref = this.dialog.open(ModelProdutoComponent, {
      width: '550px',
      data: produto
    });

    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
}
