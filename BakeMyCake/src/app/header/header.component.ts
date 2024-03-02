import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, public userService: UserService, private snackbar: MatSnackBar) {}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  // getUsername(): string {
  //   const user = this.userService.getUser();
  //   return user ? user.username : '';
  // }

  login(){
    this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    this.openSnackBar('You have logged out.');
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
