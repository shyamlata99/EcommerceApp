import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbServiceService } from 'src/app/services/db-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShown:boolean=false;

  constructor(private router:Router, private dbService:DbServiceService) { }

  ngOnInit(): void {
    this.currentData();
  }


  public currentUser : any;

  currentData(){ 
    this.dbService.collect.subscribe(data=>{ 
      this.currentUser=data; 
      // console.log(this.currentUser);
    });

   
  }

  navigation() {
    this.router.navigateByUrl('home/products'); 
  }


}
