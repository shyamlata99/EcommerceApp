import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup,  RequiredValidator,  Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from 'src/app/services/db-service.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private http:HttpClient, private dbService:DbServiceService,) { }

  ngOnInit(): void {
    this.generateOTP()
  }

  public mail:any;
  public uname:any;
  public psw:any;
  public token:any;
  public inputToken:any; 
  public userCredentials:any;
  OTPflag=false;
  flag=false;

  login=new FormGroup({
    'password':new FormControl(''),
    'email':new FormControl(''),
    'name': new FormControl('')
    
})

generateOTP() {    
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)]; 
  }
  this.token=OTP;
}


loginAuth(event){
  this.dbService.userData().subscribe(data=>{
    this.userCredentials=data;      
    for(let i=0;i<this.userCredentials.length;i++){
      if(this.userCredentials[i].email==this.mail && this.userCredentials[i].password==this.psw && this.userCredentials[i].verification==true){
        localStorage.setItem('userEmail', 'authenticate')
        this.dbService.send.next(this.userCredentials[i]);
        localStorage.setItem('currentUser',this.userCredentials[i].id);   
        this.router.navigateByUrl('home'); 
      }
      else if (this.userCredentials[i].email==this.mail && this.userCredentials[i].password==this.psw && this.userCredentials[i].verification==false) {
        this.OTPflag=true;
        this.uname=this.userCredentials[i].name;   
        emailjs.sendForm('service_flqf1mq', 'template_5pl60it', event.target as HTMLFormElement, 'user_PUpfOaE5nkjyfrqVC7qJ6')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
        }, (error) => { 
          console.log(error.text);
        });
      }
      else {
          
      }
    }
  })
}


  confirm() { 
    if(this.inputToken==this.token) {
      this.dbService.userData().subscribe(data=>{
        this.userCredentials=data;      
        for(let i=0;i<this.userCredentials.length;i++){
          if(this.userCredentials[i].email==this.mail && this.userCredentials[i].password==this.psw && this.userCredentials[i].verification==false){
            localStorage.setItem('userEmail', 'authenticate')
            this.userCredentials[i].verification=true;
            this.dbService.updateUserStatus(this.userCredentials[i].id,this.userCredentials[i]).subscribe(data=>{ 
            }); 
            this.dbService.send.next(this.userCredentials[i]);
            localStorage.setItem('currentUser',this.userCredentials[i].id);   
            this.router.navigateByUrl('home');
            }
            console.log("confirmed");
          }})
      }
    else {
      this.flag=true;
    } 
  }
}
