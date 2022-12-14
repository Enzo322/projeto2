import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  grupo: string;
  id: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-group.component.html',
  styleUrls: ['./modal-group.component.scss']
})
export class ModalGroupComponent implements OnInit {
  descricao : string = "";
  grupos : Array<any> = [];

  grupo : string = "";
  subGrupo : string = "";
  id : number = 0;
  divs : number = 0
  constructor(public dialogRef: MatDialogRef<ModalGroupComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idGrupo: number, descricao : string, status : number}) { }

  ngOnInit(): void {
    console.log(this.data.idGrupo);
    if(this.data.idGrupo == null){
      this.divs = 2
    }else{
      this.divs = 1
    }
    if (!this.data){
      return;
    }
    this.id = this.data.idGrupo,
    this.grupo = this.data.descricao;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async putItens(){
    this.grupos = await this.httpService.put('group', {descricao : this.grupo, idGrupo : this.id});
    this.onNoClick();
  }

  async postGroup(){
    this.grupos = await this.httpService.post('group',{descricao : this.grupo})
    this.onNoClick();
  }

  async deleteItens(){
    this.grupos = await this.httpService.patch('group', {idGrupo: this.id})
    this.onNoClick();
  }
}
