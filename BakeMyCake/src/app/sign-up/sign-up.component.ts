import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  hidePassword: boolean = true;
  submitStatus: boolean= false;

  registerForm: FormGroup = this.fb.group({
    id:[0],
    username:['',[Validators.required, Validators.minLength(2)]],
    email:['',[Validators.required,this.checkIfGuestEmailsAreValid]],
    password:['',[Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword:['',[Validators.required,this.passwordMatchValidator]],
    gender:[''],
    age:[0,[this.ageValidator]],
    phone: ['', [Validators.pattern(/^[789]\d{9}$/)]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['',[Validators.pattern(/^\d{5}(\d{1})?$/)]]
    })
  });

  constructor(private fb:FormBuilder, private _snackBar:MatSnackBar, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.submitStatus = false;
}

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get username() { 
    return this.registerForm.get('username'); 
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get street() {
    return this.registerForm.get('address.street');
  }

  get city() {
    return this.registerForm.get('address.city');
  }

  get state() {
    return this.registerForm.get('address.state');
  }

  get zipCode() {
    return this.registerForm.get('address.zipCode');
  }

  // checkIfGuestEmailsAreValid(c: AbstractControl) {
  //   const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
  //   if (c.value && !emailRegex.test(c.value)) {
  //     return { invalidGuestEmails: true };
  //   }
  //   return null;
  // }

  checkIfGuestEmailsAreValid(c: AbstractControl) {
    const emailRegex = /^[^0-9][a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    
    if (c.value && !emailRegex.test(c.value)) {
      return { invalidGuestEmails: true };
    }
    return null;
  }

  ageValidator(control: AbstractControl): { [s: string]: boolean } | null {
    if (control.value < 18) {
      return { invalidAge: true };
    }
    return null;
  }

  passwordMatchValidator (control: AbstractControl) { 
  const password = control.parent?.get('password')?.value; 
  const confirmPassword = control?.value;
  if (password !== confirmPassword) { 
    return { passwordMismatch: true };
  }
   return null;
}


  signup() {
    const email = this.registerForm.get('email').value;

    if (this.userService.isEmailTaken(email)) {
      this._snackBar.open('Email is already in use. Please choose another email.', 'Close', { duration: 3000 });
      return;
    }

    const newUser: User = {
      id: 0,
      username: this.registerForm.get('username').value,
      email: this.registerForm.get('email').value,
      role: 'user', 
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value,
      gender: this.registerForm.get('gender').value,
      age: this.registerForm.get('age').value,
      phone: this.registerForm.get('phone').value,
      address: {
        street: this.registerForm.get('address.street').value,
        city: this.registerForm.get('address.city').value,
        state: this.registerForm.get('address.state').value,
        zipCode: this.registerForm.get('address.zipCode').value
      },
    };

    this.userService.addUser(newUser).subscribe(
      (response) => {
        console.log('User registration successful:', response);
        this._snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']);
        this.submitStatus = true;
      },
      (error) => {
        console.error('User registration failed:', error);
        this._snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  canDeactivate() {
    if (!this.submitStatus){
     this.submitStatus = confirm("Are you sure you want to leave?");
      return this.submitStatus;
    }
    return true;
  }

}
