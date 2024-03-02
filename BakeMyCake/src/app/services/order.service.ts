import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  item_url: string = 'http://localhost:3000/orderRequests'; 
  orderData: any = null;
  
  constructor(private http: HttpClient) { }
 
  addUser(userData: Order): Observable<Order> {
    return this.http.post<Order>(this.item_url, userData);
  }

  getAllCakeRequests(): Observable<Order[]> {
    return this.http.get<Order[]>(this.item_url);
  }

  processOrder(order: Order): Observable<Order> {
    const updatedOrder: Order = { ...order, processed: true };
    return this.http.put<Order>(`${this.item_url}/${order.id}`, updatedOrder);
  }

  getOrdersByUserEmail(email: string): Observable<Order[]> {
    const url = `${this.item_url}?email=${email}`;
    return this.http.get<Order[]>(url);
  }

  
  setOrderData(orderData: any) {
    this.orderData = orderData;
  }

  getOrderData() {
    return this.orderData;
  }

  clearOrderData() {
    this.orderData = null;
  }

}



























 // getOrdersByUserEmail(email: string): Observable<Order[]> {
  //   const url = `${this.item_url}?email=${email}`;
  //   return this.http.get<Order[]>(url).pipe(
  //     catchError((error: any) => {
  //       console.error('An error occurred:', error);
  //       throw error; // Re-throw the error to propagate it further
  //     })
  //   );
  // }