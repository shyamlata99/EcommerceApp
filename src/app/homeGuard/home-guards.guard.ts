import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardsGuard implements CanActivate {
  constructor(private router:Router){}

  canActivate()
  {
    if(localStorage.getItem('userEmail'))
    {
      localStorage.removeItem('userEmail');
      return true;
    }
   else 
    {
      this.router.navigateByUrl('');
      return false;
    }
 
  }
}
