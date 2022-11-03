import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalGroupComponent } from '../modal-group/modal-group.component'; 
export interface DialogData {
  grupo: string;
  id: number;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  descricao : string = "";
  grupos : Array<any> = [];

  grupo : string = "";
  subGrupo : string = "";
  search : string = '';
  id: number = 0;
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  openPutModal(grupo : any): void {
    const ref = this.dialog.open(ModalGroupComponent, {
      width: '550px',
      data: grupo
    });

    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }



  async get(){
    this.grupos = await this.httpService.get('group');
  }

  // async patch(){
  //   this.grupos = await this.httpService.patch('grupo');
  // }  


}