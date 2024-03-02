import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item_url: string = 'http://localhost:3000/items';
  constructor(private http: HttpClient) { }
  
    getItems(): Observable<Item[]> {
      return this.http.get<Item[]>(this.item_url);
    }

    getItem(id?: string) : Observable<Item>{
      console.log(id);
      return this.http.get<Item>(`${this.item_url}/${id}`);
    }

}
