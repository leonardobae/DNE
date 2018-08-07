import { Component, OnInit } from '@angular/core';
import { LoginSessionService } from '../../../services/login-session.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = '';
  pwd:string = '';
  dialogRef:any = null;

  constructor(
    private loginSession: LoginSessionService,
    private router: Router,
    public dialog: MatDialog

  ) {
    console.log('--------------');
    console.log(localStorage.getItem('access_token'))
    console.log(localStorage.getItem('expires_in'))
    console.log('------------')
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in'); 
  }

  ngOnInit() {
  }

  login(){
    console.log("ajsdfoajso")
    this.loginSession.login(this.email, this.pwd)
    .then(res=>{
      alert("로그인 되었습니다");
      this.router.navigate(['/']);
    })
    .catch(err=>{
      console.log(err);
      alert("로그인 정보를 확인해주세요");
    });
  }

  


}
