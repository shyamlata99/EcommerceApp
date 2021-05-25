import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { ProductsComponent } from './home/products/products.component';
// import { CartComponent } from './home/cart/cart.component';


const routes: Routes = [  
  // {
  //   path:'home',component:HomeComponent,canActivate:[HomeGuardsGuard] 
  // },
  {
    path:'home', loadChildren:()=> import('./home/home.module')
    .then(mod=>mod.HomeModule)
  },
  {
    path:'login',component:LoginComponent   
  },
  {
    path:'register',component:RegisterComponent 
  },
  //{
  //   path:'products', component:ProductsComponent
  // },
  // { 
  //   path:'cart', component:CartComponent   
  // },
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  
  {
    path:'**',component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
