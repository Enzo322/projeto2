import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { ModelColectionComponent } from '../model-colection/model-colection.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-colection',
  templateUrl: './colection.component.html',
  styleUrls: ['./colection.component.scss']
})
export class ColectionComponent implements OnInit {
  search : string = '';
  colection : string = '';
  colections : Array<any> = [];
  constructor(private HttpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get()
  }
  openModal(colection : any) : void{
    const ref = this.dialog.open(ModelColectionComponent, {
      width: '550px',
      data: colection
    });

    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  async get(){
    this.colections = await this.HttpService.get('colection');
  }

}
