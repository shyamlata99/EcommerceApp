import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbServiceService } from 'src/app/services/db-service.service';

interface Filter1 {
  value: string;
  viewValue: string;
}
interface filter2 {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  
  
  public productDetails:any;
  public Products:any;
  public Clothing:any;
  public Electronics:any;
  public Decor:any;
  public Footwear:any;
  public searchInput:any ;
  public searchedItems = [];
  public selectedValue: any;
  public no : any;
  currentuser:any;
  public number:any;
  cart:any;
  sortBy="Sort by ↓↑"; 
  category="Category";

  constructor(private router:Router, private dbService:DbServiceService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getcurrentuser();
  }  

  foods: filter2[] = [
    {value:'none',viewValue:'None'},
   {value: 'Price ↓ : Low to High', viewValue: 'Price ↓ : Low to High'},
   {value: 'Price ↑ : High to Low', viewValue: 'Price ↑ : High to Low'}
 ];

 categories: Filter1[] = [
  
  {value:'none',viewValue:'None'},
  {value: 'Electronics', viewValue: 'Electronics'},
  {value: 'Clothing', viewValue: 'Clothing'},
  {value: 'Footwear', viewValue: 'Footwear'},
  {value: 'Decor', viewValue: 'Decor'},
 ];

  getcurrentuser(){

    let n = Number(localStorage.getItem("currentUser"));  
     n = n-1;

    this.dbService.userData().subscribe(data=>{
      this.currentuser=data[n]; 
      console.log(this.currentuser);
      this.cart=this.currentuser.cart;
    })
  }

  getProducts(){  
    this.dbService.getProducts().subscribe(data=>{  
      this.productDetails=data;
      this.Products=this.productDetails.Products;
      this.Clothing=this.productDetails.Clothing;
      this.Electronics=this.productDetails.Electronics;
      this.Decor=this.productDetails.HomeDecor;
      this.Footwear=this.productDetails.Footwear;  
    })
  } 

  searchProduct(){
    this.dbService.getProducts().subscribe(data=>{
      this.productDetails=data;
      this.Products=this.productDetails.Products;
      this.Products.forEach(elem => { 
       if(this.searchInput.toLowerCase()==elem.title.toLowerCase()){
         this.searchedItems.push(elem);
       }
     });
    this.Products=this.searchedItems;
    })
   }

   cartbtn(){
      this.dbService.send.next(this.currentuser);
      this.router.navigateByUrl('cart'); 
   }

   lowtohigh(){
    this.sortBy="Price ↓ : Low to High"  
    console.log("low to high");
    this.Products.sort((a, b) => (a.price < b.price ? -1 : 1));;
  
  }
  hightolow(){
    this.sortBy="Price ↑ : High to Low" 
    this.Products.sort((a, b) => (a.price > b.price ? -1 : 1));; 
   
  }
  none(){
    this.sortBy="Sort by : ↓ ↑";
   this.dbService.getProducts().subscribe(data=>{
     this.productDetails=data;
     this.Products=this.productDetails.Products;
   })
  }
  clothing(){
    this.category="Clothing";
    this.Products=this.productDetails.Clothing;
  }
  all(){
    this.category="All Products";
    this.dbService.getProducts().subscribe(data=>{
      this.productDetails=data;
      this.Products=this.productDetails.Products;
    })
  }
  electronics(){
    this.category="Electronics";
    this.Products=this.productDetails.Electronics;
  }

  footwear(){
  this.category="Footwear";
  this.Products=this.productDetails.Footwear;
  }

  decor(){
    this.category="Decor";
    this.Products=this.productDetails.HomeDecor;
    }

  addCart(index,data){ 
    if(!this.currentuser.cart.includes(data)){ 
      data.quantity++;
      this.cart.push(data);
      this.currentuser.cart=this.cart;
      this.no=this.currentuser.cart.length;
      if(this.no!=0){
        this.number=true;
      }
      this.dbService.updateUserStatus(this.currentuser.id,this.currentuser).subscribe(data=>{
    });
  }
  else{
    data.quantity++;
    this.dbService.updateUserStatus(this.currentuser.id,this.currentuser).subscribe(data=>{
    });
  }
  }
}
