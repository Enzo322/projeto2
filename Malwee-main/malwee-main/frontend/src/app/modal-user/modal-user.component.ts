import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
  idUser : number = 1;
  public users : Array<any> = [];

  constructor(public dialogRef: MatDialogRef<ModalUserComponent>,private HttpService : HttpService, @Inject(MAT_DIALOG_DATA) private data : {id: number, username : string, password : string}) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(){
    this.users = await this.HttpService.get('user')
  }
  async deleteUser(){
    this.users = await this.HttpService.patch('user',{id : this.idUser})
    this.dialogRef.close();
  }
  async putUser(){
    this.users = await this.HttpService.put('user',{id : this.data.id, password : this.data.password})
  }

  idUsers(){
    console.log(this.idUser)
  }
}
