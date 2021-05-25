import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  RequiredValidator,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { DbServiceService } from 'src/app/services/db-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private http:HttpClient, private dbService:DbServiceService) { }

  ngOnInit(): void {  
  }

  register=new FormGroup({
    'name':new FormControl('',[Validators.required]),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'address':new FormControl('',Validators.required), 
    'id':new FormControl(''),
    'password':new FormControl('',[Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    'Cpassword':new FormControl('',[Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    'verification': new FormControl(''),
    'cart' : new FormControl(' '),
  })

  incorrect:String; 
  imgFile = null;
  isClicked=false;
  public flag=false;

  onFileSelected(event) { 
    this.imgFile = <File>event.target.files[0];  
    console.log(this.imgFile);
  }

  adduser() {    
      this.isClicked=true;
      this.register.value.src="assets/images/"+`${this.imgFile.name}`; 
      this.dbService.send.next(this.register.value);
      this.register.value.verification=false;
      this.register.value.cart=[];
      this.dbService.addUser(this.register.value).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('login'); 
    })  

  }  

}
