import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelProdutoComponent } from '../model-produto/model-produto.component';
import { ModalPedidoComponent } from '../modal-pedido/modal-pedido.component';
import * as moment from 'moment';
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
    this.pedidos.forEach(element=>{
      console.log(element);
      element.dtEmissao = moment(element.dtEmissao).format('DD/MM/YYYY');
      element.dtEntrega = moment(element.dtEntrega).format('DD/MM/YYYY');

    })
  }

  openModal(pedido : any) : any{
    const ref = this.dialog.open(ModalPedidoComponent, {
      width: '600px',
      data: pedido
      
    })
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
}
