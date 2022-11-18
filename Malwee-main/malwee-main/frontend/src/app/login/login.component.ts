import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string = 'Enzo'; //falta responsividade, arrumar os dropdown e fazer daquele jeito o produto
  password : string = 'senha123';
  hide : boolean = true;
  isLogin : boolean = false;

  constructor(private router : Router, private HttpClient : HttpClient) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.login();
    })
  }

  login(){
    this.HttpClient.post('http://localhost:3005/logon', {username : this.username, password : this.password}).toPromise().then((response : any)=> {
    console.log(response);
      if(response.token){
        this.isLogin = true;
        window.localStorage.setItem('token', response.token);
        
        this.router.navigateByUrl('');
        console.log("Logado");
      }
    })
  }
}
