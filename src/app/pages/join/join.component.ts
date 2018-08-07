import { Component, OnInit } from '@angular/core';
import { FormSyntax } from '../../../types/form';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})

export class JoinComponent implements OnInit {

  student_id: String = "";
  name: String = "";
  phone: String = "";
  pwd: String = "";
  
  pass_1: String = "";
  pass_2: String = "";

  std_id_text: String = "";
  pass_text: String = "";
  phone_text: String = "";

  valid_std_id : boolean = false;
  valid_phonenum : boolean = false;
  valid_pwd : boolean = false;

  FORM : FormSyntax;
 
  constructor( 
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  passComp(){
    if(this.pass_1 === this.pass_2 && this.pass_1 !== ""){
      this.pass_text = "비밀번호가 일치합니다!";
      this.valid_pwd = true;
    }

    else if(this.pass_1 === "" && this.pass_2 === ""){
      this.pass_text = " ";
      this.valid_pwd = false;
    }
    
    else if((this.pass_1 !== this.pass_2) && this.pass_2 !== ""){
      this.pass_text = "비밀번호가 불일치합니다!";
      this.valid_pwd = false;
    }
  }

  valid_id(){
    this.std_id_text = this.student_id;

    if(this.student_id === ""){
      this.std_id_text = " ";
      this.valid_std_id = false;
    }
    else if(this.student_id.toString().length === 8){
      this.std_id_text = " ";
      this.valid_std_id = true;
    }
    else{
      this.std_id_text = "학번 8자리를 올바르게 입력해주세요";
      this.valid_std_id = false;
    }

  }
  valid_phone(){
    if(this.phone === ""){
      this.phone_text = "- 없이 입력";
      this.valid_phonenum = false;
    }
    else if(this.phone.toString().length === 11){
      this.phone_text = " ";
      this. valid_phonenum = true;
    }
    else{
      this.phone_text = "핸드폰 번호11자리를 - 없이 입력해주세요";
      this.valid_phonenum = false;
    }
  }

  register(){

    if(this.valid_std_id && this.valid_phonenum && this.valid_pwd){
      this.FORM = new FormSyntax();
      this.FORM.student_id = this.student_id;
      this.FORM.name = this.name;
      this.FORM.phone = this.phone;
      this.FORM.pwd = this.pwd;

      this.httpService.post_check(this.FORM)
      .subscribe(_=>{
        console.log(_);
        alert("가입을 축하합니다");
        this.httpService.post_reg(this.FORM)
        .subscribe(_=>{
          console.log(_);
        }, err =>{
          console.log(err);
          alert(err);
        });
        this.router.navigate(['/']);
      }, err=>{
        console.log(err);
        alert("이미 가입된 학번입니다!");
      });

      console.log("sended post request");

      //and set post
    }
    else{
      alert("정보를 바르게 입력해주세요");
    }


    console.log(this.FORM);
  }

}
