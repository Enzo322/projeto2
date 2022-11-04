import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { DropdownComponent } from '../dropdown/dropdown.component'; 
import { GroupComponent } from '../group/group.component';
import { ModalGroupComponent } from '../modal-group/modal-group.component';
export interface DialogData {
  subGrupo: string;
  fk: number;
}

@Component({
  selector: 'app-model-sub',
  templateUrl: './model-sub.component.html',
  styleUrls: ['./model-sub.component.scss']
})
export class ModelSubComponent implements OnInit {

  divs : number = 0
  sub: string = "";
  subGrupos : Array<any> = [];
  grupo : string = "";
  public grupos : Array<any> = [];
  selectedGroup : number = 0;
  public subgroups: Array<any> = [];

  constructor(public dialogRef: MatDialogRef<ModelSubComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idSub: number, tipoProduto : string, fkGroup : number}) { }

  ngOnInit(): void {
    this.loadGroup();
    if(this.data.idSub == null){
      this.divs = 2
    }else{
      this.divs = 1
    }
    if (!this.data){
      return;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async putItens(){
    this.subGrupos = await this.httpService.put('subGroup',
     {tipoProduto : this.sub, idSub : this.data.idSub});
    this.dialogRef.close();
  }

  async postSub(){
    this.subGrupos = await this.httpService.post('subGroup',{tipoProduto : this.sub, fkGroup : this.selectedGroup})
    this.dialogRef.close();
  }

  async deleteItens(){
    console.log("fk " + this.data.fkGroup);
    console.log("id "+ this.data.idSub);
    this.subGrupos = await this.httpService.patch('subGroup', {fkGroup : this.data.fkGroup, idSub : this.data.idSub})
    this.dialogRef.close();
  }

  public async loadGroup() {
      this.grupos = await this.httpService.get('group');  
      console.log(this.grupos)  ;
  }
  
}
