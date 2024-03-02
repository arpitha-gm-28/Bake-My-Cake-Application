import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';


@Component({
  selector: 'app-cake-requests',
  templateUrl: './cake-requests.component.html',
  styleUrls: ['./cake-requests.component.css']
})
export class CakeRequestsComponent {

  cakeRequests: Order[] = [];
  displayedColumns: string[] = [
    'customerName',
    'email',
    'phone',
    'itemName',
    'price',
    'quantity',
    'total',
    'address',
    'action'
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllCakeRequests().subscribe({
      next: (data) => {
        this.cakeRequests = data;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  processOrder(order: Order) {
    order.processed = true;
    this.orderService.processOrder(order).subscribe((updatedOrder) => {
    });
  }

}







// ngOnInit(): void {
  //   this.orderService.getAllCakeReqeusts().subscribe({
  //     next: data => {
  //       this.cakeRequests = data;
  //     },
  //     error: err => {
  //       alert(err);
  //     }
  //   });
  // }

  // processOrder(order: Order) {
  //   order.processing = true;

  //   setTimeout(() => {
  //     order.processing = false;
  //     order.processed = true;
  //   }, 2000);
  // }


  // displayedColumns: any[] = ['customerName', 'email', 'phone', 'itemName', 'price', 'quantity', 'total', 'address'];


  // getOrderValue(order: Order, column: string): any {
  //   switch (column) {
  //     case 'customerName':
  //       return order.customerName;
  //     case 'email':
  //       return order.email;
  //     case 'phone':
  //       return order.phone;
  //     case 'itemName':
  //       return order.itemName;
  //     case 'price':
  //       return order.price;
  //     case 'quantity':
  //       return order.quantity;
  //     case 'total':
  //       return order.total;
  //     case 'address':
  //       // Access nested address properties
  //       return `${order.address.street}, ${order.address.zipCode}`;
  //     default:
  //       return '';
  //   }
  // }