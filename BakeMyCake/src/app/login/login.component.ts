import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;
  submitStatus: boolean= false;

  loginForm: FormGroup = this.fb.group({
    // username:['',[Validators.required, Validators.minLength(2)]],
    email:['',[Validators.required,this.checkIfGuestEmailsAreValid]],
    password:['',[Validators.required, Validators.minLength(8)]]
  });

  constructor(private router: Router, private userService: UserService, private fb:FormBuilder, private snackBar:MatSnackBar,) {}

  ngOnInit(): void {
     this.submitStatus = false;
 }

  // get username() { 
  //   return this.loginForm.get('username'); 
  // }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  checkIfGuestEmailsAreValid(c: AbstractControl) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (c.value && !emailRegex.test(c.value)) {
      return { invalidGuestEmails: true };
    }
    return null;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

login() {
  if (this.loginForm.valid) {
    const message = this.userService.authenticate(this.loginForm.value.email, this.loginForm.value.password);

    if (message === 'Please logout first') {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
      this.loginForm.reset();
    } else if (message === 'Invalid login credentials') {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
      this.loginForm.reset();
    } else {
      const user = this.userService.getUser();
      if (user) {
        if (user.role === 'user') {
          this.router.navigate(['view'], { queryParams: { email: user.email } });
        } else if (user.role === 'administrator') {
          this.router.navigate(['cake-requests']);
        }
        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
        });
        this.submitStatus = true;
      }
    }
  }
}

canDeactivate() {
  if (!this.submitStatus){
   this.submitStatus = confirm("Are you sure you want to leave?");
    return this.submitStatus;
  }
  return true;
}
}











// login() {
//   if (this.loginForm.valid) {
//     const user = this.userService.authenticate(this.loginForm.value.username, this.loginForm.value.email, this.loginForm.value.password);
//     if (user) {
//       if (user.role === 'user') {
//         this.router.navigate(['order'], { queryParams: { email: user.email } });
//       } else if (user.role === 'administrator') {
//         this.router.navigate(['cake-requests']);
//       }
//     } else {
//       this.snackBar.open('Invalid login credentials', 'Close', {
//         duration: 3000,
//       });this.loginForm.reset();
//     }
//   }
// }