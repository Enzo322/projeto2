import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelClientComponent } from '../model-client/model-client.component';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client : string = '';
  clients : Array<any> = [];
  
  search : string = '';

  constructor(private HttpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();    
  }

  async get(){
    this.clients = await this.HttpService.get('client');
  }
  openModal(client : any) : any{
    const ref = this.dialog.open(ModelClientComponent, {
      width: '550px',
      data: client
    });

    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
}
