import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { ModelClientConfirmationComponent } from '../model-client-confirmation/model-client-confirmation.component';
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
  idUser : number = 1;
  public users : Array<any> = [];

  constructor(public dialogRef: MatDialogRef<ModalUserComponent>,private HttpService : HttpService, 
    @Inject(MAT_DIALOG_DATA) private data : {id: number, username : string, password : string}, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(){
    this.users = await this.HttpService.get('user')
  }
  async deleteUser(){
    localStorage.setItem('idUsuario', `${this.data.id}`)
    // this.openConfirmationModal();
    this.onNoClick();
    // this.users = await this.HttpService.patch('user',{id : this.idUser})
    // this.dialogRef.close();
  }
  async putUser(){
    this.users = await this.HttpService.put('user',{id : this.data.id, password : this.data.password})
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // openConfirmationModal(): void {
  //   this.dialog.open(ModelClientConfirmationComponent, {
  //     width: '300px',
  //   });
  // }
}
