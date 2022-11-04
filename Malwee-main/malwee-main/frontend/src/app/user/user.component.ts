import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalUserPassComponent } from '../modal-user-pass/modal-user-pass.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users : Array<any> = [];
  user : string = "";
  name : string = "";
  username : string = "";
  password : string = "";
  cpassword : string = "";
  constructor(private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get()
  }

  async get(){
    this.users = await this.httpService.get('user')
  }
  async postUser(){
    this.users = await this.httpService.post('user', {name : this.name, username : this.username,
    password : this.password, cpassword : this.cpassword})
    this.clear();
    this.ngOnInit()
  }
  clear(){
    this.name = "";
    this.username = "";
    this.password = "";
    this.cpassword = "";
  }
  openModal1(user : any): void {
    const ref = this.dialog.open(ModalUserPassComponent, {
      width: '500px',
      data: user
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
  }
  
  openModal2(user : any): void {
    const ref = this.dialog.open(ModalUserComponent, {
      width: '350px',
      data: user
    });
    ref.afterClosed().subscribe(result => {
      this.get();
    })
    
  }
}
