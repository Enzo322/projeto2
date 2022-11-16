import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-modal-user-pass',
  templateUrl: './modal-user-pass.component.html',
  styleUrls: ['./modal-user-pass.component.scss']
})
export class ModalUserPassComponent implements OnInit {
password : string = "";
cpassword : string = "";
selectedGroup : number =  0
users : Array<any> = [];
  constructor(public dialogRef: MatDialogRef<ModalUserPassComponent>, private httpService : HttpService, @Inject(MAT_DIALOG_DATA) private data : {id: number, password : string}) { }

  ngOnInit(): void {
    this.get();
  }

  async trocaDeSenha(){
    this.users = await this.httpService.put('user', {password : this.password, id : this.selectedGroup})
    this.dialogRef.close();
  }
  async clear(){
    this.password = "";
    this.cpassword = "";
    this.dialogRef.close();
  }
  async get(){
    this.users = await this.httpService.get('user')
  }
}
