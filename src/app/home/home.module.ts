import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule , Routes } from '@angular/router';
import { HomeGuardsGuard } from '../homeGuard/home-guards.guard';

const proRoutes: Routes = [
    // {path: '' , children: [
    {path:'' , component:HomeComponent},
    {path:'products' , component:ProductsComponent},
    {path:'cart' , component:CartComponent},
// ] 
]
 
@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(proRoutes),
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatBadgeModule,
    MatSelectModule,
  ]
})
export class HomeModule { 
  constructor() {
    console.log("HomeModule Loaded"); 
  }
}
