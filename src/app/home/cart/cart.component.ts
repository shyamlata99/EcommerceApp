import { Component, OnInit } from '@angular/core';
import { DbServiceService } from 'src/app/services/db-service.service';
import { HttpClient } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public currentuser:any;
  public email:any;
  public name:any;
  public src:any;
  public cart:any;
  public currentCart:any;
  public no:any;
  public subtotal=0;
  getProducts:any;

  constructor(private dbService:DbServiceService ,  private http:HttpClient) { }

  ngOnInit(): void {
    this.cartItems();
  }

  // public cart : any;

  cartItems(){
    this.dbService.collect.subscribe(data=>{ 
      this.cart=data;  
      this.currentCart=this.cart.cart;
      this.email=this.cart.email;
      this.name=this.cart.name;
      this.src=this.cart.src;
      console.log(this.src);
      this.no=this.currentCart.length
      this.currentCart.forEach(element => {
        this.subtotal+=element.quantity*element.price;
      });
    })
  }

  reducequantity(index){
    if(this.currentCart[index].quantity==1){
      this.currentCart.splice(index,1);
      this.no=this.currentCart.length;
      this.dbService.updateUserStatus(this.cart.id,this.cart).subscribe(data=>{
        this.subtotal=0;
        this.currentCart.forEach(element => { 
          this.subtotal+=element.quantity*element.price;
        });
      })
    }
    else{ 
    this.currentCart[index].quantity=this.currentCart[index].quantity-1;
    this.dbService.updateUserStatus(this.cart.id,this.cart).subscribe(data=>{
      this.subtotal=0;
      this.currentCart.forEach(element => {
        this.subtotal+=element.quantity*element.price;
      });
    })
  }
  }

  addquantity(index){
    console.log(this.cart)
    this.currentCart[index].quantity=this.currentCart[index].quantity+1;
    this.dbService.updateUserStatus(this.cart.id,this.cart).subscribe(data=>{
      this.subtotal=0;
     
      this.currentCart.forEach(element => {
        this.subtotal+=element.quantity*element.price; 
      });
    }) 
  }
  checkout(event){ 
    emailjs.sendForm('service_flqf1mq', 'template_mwzxgkm', event.target as HTMLFormElement, 'user_PUpfOaE5nkjyfrqVC7qJ6')
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
        }, (error) => { 
          console.log(error.text);
        });
        alert("Your Order is Confirmed. Kindly check your mail to review your order summary");
        localStorage.removeItem('currentUser')
      }
      
  }
  

