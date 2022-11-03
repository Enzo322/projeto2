import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelSubComponent } from '../model-sub/model-sub.component';
export interface DialogData {
  tipoProduto: string;
  fk : number;
}

@Component({
  selector: 'app-sub-grupo',
  templateUrl: './sub-grupo.component.html',
  styleUrls: ['./sub-grupo.component.scss']
})
export class SubGrupoComponent implements OnInit {
  tipoProduto : string = "";
  subGrupos : Array<any> = [];
  subGrupo : string = "";
  search : string = '';
  fk: number = 0;
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get()
  }
  openModal(sub : any): void {
    const ref = this.dialog.open(ModelSubComponent, {
      width: '550px',
      data: sub
    });

    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }

  async get(){
    this.subGrupos = await this.httpService.get('subGroup');
  }
}
