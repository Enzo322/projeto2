import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelProdutoComponent } from '../model-produto/model-produto.component';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  search : string  = '';

  pedido : string = '';
  pedidos : Array<any> = [];

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get()
  }

  async get(){
    this.pedidos = await this.httpService.get('pedido');
  }

  openModal(pedido : any) : any{
    const ref = this.dialog.open(ModalPedidoComponent, {
      width: '550px',
      data: pedido
    })
  }
}
