import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  descricao: string;
  idColecao: number;
}
@Component({
  selector: 'app-model-colection',
  templateUrl: './model-colection.component.html',
  styleUrls: ['./model-colection.component.scss']
})
export class ModelColectionComponent implements OnInit {
colection : string = '';
colections : Array<any> = [];
divs : number = 0
  constructor(public dialogRef: MatDialogRef<ModelColectionComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idColecao: number, descricao : string}) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.idColecao == null){
      this.divs = 2
    }else{
      this.divs = 1
    }
    if (!this.data){
      return;
    }
  }
  async putItens(){
    this.colections = await this.httpService.put('colection', {descricao : this.colection, idColecao : this.data.idColecao});
    this.dialogRef.close();
  }

  async postColection(){
    this.colections = await this.httpService.post('colection',{descricao : this.colection})
    this.dialogRef.close();
  }

  async deleteItens(){
    this.colections = await this.httpService.patch('colection', {idColecao: this.data.idColecao})
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
