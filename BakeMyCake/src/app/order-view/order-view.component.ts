import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  item?: Item;
  stars: Array<number> = [];
  submitStatus: boolean= false;

  Quantity = 0;
  totalPrice = 0;

  registerForm: FormGroup = this.fb.group({
    id:[0],
    itemName: [''],
    price: [0],
    quantity: [0],
    total:[0],
    customerName:['',[Validators.required, Validators.minLength(2)]],
    email:['',[Validators.required,this.checkIfGuestEmailsAreValid]],
    phone: ['', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]],
    address: this.fb.group({
      street: ['',[Validators.required]],
      zipCode: ['',[Validators.required, Validators.pattern(/^\d{5}(\d{1})?$/)]]
    })
  });
 
  constructor(private activatedRoute: ActivatedRoute, private fb:FormBuilder,
    private itemService: ItemService, private orderService: OrderService,
    private routeService: RouterService, private userService: UserService,
    private snackBar: MatSnackBar) { 

      this.activatedRoute.queryParams.subscribe((params) => {
      this.registerForm.get('email')?.setValue(params['email']);
    }); 
  
    this.initializeOrderData();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
   let id = param.get("id") ?? "";
   this.itemService.getItem(id).subscribe(data => {
     this.item = data;
     this.stars = new Array(this.item.rating);
     this.submitStatus = false;
   })
 })

 if (this.userService.isLoggedIn()) {
  const user = this.userService.getUser();
  if (user) {
    this.registerForm.get('email')?.setValue(user.email);
    // Disable the email input field
    this.registerForm.get('email')?.disable();
  }
}

}

  get itemName() { 
    return this.registerForm.get('itemName'); 
  }

  get price() { 
    return this.registerForm.get('price'); 
  }

  get quantity() { 
    return this.registerForm.get('quantity'); 
  }

  get total() { 
    return this.registerForm.get('total'); 
  }

  get customerName() { 
    return this.registerForm.get('customerName'); 
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get street() {
    return this.registerForm.get('address.street');
  }

  get zipCode() {
    return this.registerForm.get('address.zipCode');
  }

  checkIfGuestEmailsAreValid(c: AbstractControl) {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (c.value && !emailRegex.test(c.value)) {
      return { invalidGuestEmails: true };
    }
    return null;
  }

  resetSpecificFields() {
    this.registerForm.get('quantity').reset();
    this.registerForm.get('total').reset();
    this.registerForm.get('customerName').reset();
    this.registerForm.get('phone').reset();
    this.registerForm.get('address.street').reset();
    this.registerForm.get('address.zipCode').reset();
  }

  private initializeOrderData() {
    const storedOrderData = this.orderService.getOrderData();
    if (storedOrderData) {
      this.Quantity = storedOrderData.Quantity;
      this.totalPrice = storedOrderData.totalPrice;
    }
  }
  
  addToCart() {
    this.Quantity += 1;
    this.totalPrice += this.item.price;
  
    this.orderService.setOrderData({
      Quantity: this.Quantity,
      totalPrice: this.totalPrice,
    });
  }
  
  removeFromCart() {
    if (this.Quantity > 0) {
      this.Quantity -= 1;
      this.totalPrice -= this.item.price;
  
      this.orderService.setOrderData({
        Quantity: this.Quantity,
        totalPrice: this.totalPrice,
      });
    }
  }

  onSubmit(){
    if(!this.userService.isLoggedIn()){
      this.routeService.navigateToLoginView();
      this.snackBar.open('You have to login first to place an order', 'Close', { duration: 3000 });
    }else{
      const userEmail = this.userService.getUser()?.email;

      if (userEmail) {
    let orderDetails: Order = this.registerForm.value as Order;
    orderDetails.email = userEmail;
    orderDetails.processed = false;
      this.orderService.addUser(orderDetails).subscribe({
        next: data => {
          this.snackBar.open('Hurray!! You have placed and order!!', 'success', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-primary']
          })
          this.registerForm.reset();
          this.submitStatus = true;
          this.routeService.navigateToView();
        },
        error: err => {
          this.snackBar.open('Failed to place and order!! Please Try Again Later', 'Failure', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      })
    }
  }
}

canDeactivate() {
  if (!this.submitStatus) {
    const leave = confirm("You have not submitted a request to place this order. Any details entered will be lost. Are you sure you want to leave?");
    if (leave) {
      this.orderService.clearOrderData();
    }
    return leave;
  }
  return true;
}
}





























// logout() {
//   this.userService.logout();
//   // Clear the email field and enable it for editing
//   this.registerForm.get('email')?.setValue('');
//   this.registerForm.get('email')?.enable();
// }

  // onSubmit(){
  //   let orderDetails: Order = this.registerForm.value as Order;
  //     this.orderService.addUser(orderDetails).subscribe({
  //       next: data => {
  //         this.snackBar.open('Hurray!! You have placed and order!!', 'success', {
  //           duration: 5000,
  //           panelClass: ['mat-toolbar', 'mat-primary']
  //         })
  //         this.registerForm.reset();
  //       },
  //       error: err => {
  //         this.snackBar.open('Failed to place and order!! Please Try Again Later', 'Failure', {
  //           duration: 3000,
  //           panelClass: ['mat-toolbar', 'mat-warn']
  //         });
  //       }
  //     })
  // }
  
    // addToCart() {
  //   this.quantity += 1; 
  //   this.totalPrice += this.item.price; 
  // }

  // removeFromCart() {
  //   if (this.quantity > 0) {
  //     this.quantity -= 1; 
  //     this.totalPrice -= this.item.price; 
  //   }
  // }

  //   canDeactivate() {
//     if (!this.submitStatus){
//         this.submitStatus = confirm("You have not submitted a request to place this order. Any details entered will be lost. Are you sure you want to leave?");
//     return this.submitStatus;
// }
// return true;
//   }
