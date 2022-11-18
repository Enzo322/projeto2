import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  grupos : Array<any> = [];
  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>, private httpService : HttpService,
    @Inject(MAT_DIALOG_DATA) private data : {idGroup: number}) { }

  ngOnInit(): void {
    console.log(this.data.idGroup)
  }

  async deleteItens(){
    this.grupos = await this.httpService.patch('group', {idGrupo: this.data.idGroup});
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
