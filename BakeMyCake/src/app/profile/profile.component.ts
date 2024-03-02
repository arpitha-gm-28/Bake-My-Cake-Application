import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  orders: Order[] = [];
  userEmail: string = '';

  constructor(private orderService: OrderService, private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.userEmail = user.email;
      this.orderService.getOrdersByUserEmail(this.userEmail).subscribe((data) => {
        this.orders = data;
      });
    }
  }
  
}














  // ngOnInit(): void {
  //   // Fetch user orders based on the user's email
  //   this.orderService.getOrdersByUserEmail(this.userEmail).subscribe((data) => {
  //     this.orders = data;
  //   });
  // }