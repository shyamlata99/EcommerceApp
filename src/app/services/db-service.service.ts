import { Injectable } from '@angular/core';
import {HttpClient,  HttpClientModule} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http:HttpClient) { }

  public send=new BehaviorSubject({}) 
  public collect=<any>this.send.asObservable();

  userURL="http://localhost:3000/users";
  productsURL="http://localhost:3000/products";

  addUser(data){
    return this.http.post(this.userURL,data);
  } 

  userData(){
    return this.http.get(this.userURL);
  }

  updateUserStatus(id,data){
    return this.http.put(`${this.userURL}`+`/${id}`,data);
  }
  
// clothes

  addClothes(datacloth){
    return this.http.post(this.productsURL,datacloth);
  } 

  getClothes(){
    return this.http.get(this.productsURL);
  } 

  //footwear
  addFoot(datafoot){
    return this.http.post(this.productsURL,datafoot);
  } 

  getFoot(){
    return this.http.get(this.productsURL);
  } 

  //homedecor

  addDecor(datadecor){
    return this.http.post(this.productsURL,datadecor);
  } 

  getDecor(){
    return this.http.get(this.productsURL);
  } 

  //electronics

  addElectronics(dataelectronics){
    return this.http.post(this.productsURL,dataelectronics);
  } 

  getProducts(){
    return this.http.get(this.productsURL);
  } 

  

  // getuser(){
  //   return this.http.get(this.userURL);
  // }

}
