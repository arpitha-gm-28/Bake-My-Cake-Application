import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  navigateToView(){
    this.router.navigate(['/view']);
  }

  navigateToLoginView() {
    this.router.navigate(['/login']);
  }

  navigateToOrderView() {
    this.router.navigate(['/order']);
  }

}
