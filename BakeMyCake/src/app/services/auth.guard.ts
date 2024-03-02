import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private routerService: RouterService, private snackBar: MatSnackBar, private router: Router){}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

if (!this.userService.isLoggedIn()) {
  this.snackBar.open('Please login first.', 'Close', { duration: 3000 });
  this.router.navigate(['login']);
  return false;
} 

 if (this.userService.hasAdminRole()) {
  return true;
 }
 else if (this.userService.getUser()?.role === 'user') {
  if (state.url === '/cake-requests') {
    this.snackBar.open('Access denied. You do not have the required role.', 'Close', { duration: 3000 });
    this.router.navigate(['view']);
    return false;
  }
  return true;
} else {
  return false;
}
}

}




























//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if(!this.userService.isLoggedIn()){
//         this.userService.box();
//         this.routerService.navigateToLoginView();
//         return false;
//     }
//     else
//       return true;
// }


// canActivate(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//   if (!this.userService.isLoggedIn()) {
//     this.userService.box();
//     this.routerService.navigateToLoginView();
//     return false;
//   } else if (!this.userService.hasAdminRole()) {
//     this.snackBar.open('Access denied. You do not have the required role.', 'Close', { duration: 3000 });
//     this.routerService.navigateToView(); 
//     return false;
//   } else {
//     return true;
//   }
// }
  

// this.snackBar.open('You are Authorised.', 'Close', { duration: 3000 });

