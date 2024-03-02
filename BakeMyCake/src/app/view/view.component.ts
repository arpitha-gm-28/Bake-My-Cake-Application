import { Component } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  items: Item[] = [];
  categoryFiltered: Item[] = [];
  filteredItems: Item[] = [];
  noResultsMessage: string = '';
 
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems().subscribe(
      (data) => {
        this.items = data;
        this.categoryFiltered=data;
        this.filteredItems = data;
      },
      (error) => {
        alert('Failed to Fetch Items Due to Server Error !!');
        console.error(error);
      }
    );
  }

  onSearch(searchText: string) {
    if (searchText) {
      this.items = this.items.filter(item =>
        item.itemName?.toLowerCase().includes(searchText.toLowerCase())
      );
  
      if (this.items.length === 0) {
        this.noResultsMessage = 'No results found.';
      } else {
        this.noResultsMessage = '';
      }
    } else {
      this.filteredItems = this.categoryFiltered;
      this.getItems();
      this.noResultsMessage = '';
    }
  }
  

  onCategoryChanged(selectedCategory: string) {
    if (!selectedCategory) {
      this.items = this.categoryFiltered;
    } else {
      this.items = this.categoryFiltered.filter((item) =>
        item.type.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  }

  
 
}


















  // onSearch(searchText: string) {
  //   if (searchText) {
  //     this.items = this.items.filter(item =>
  //       item.itemName?.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   } else {
  //     this.filteredItems = this.categoryFiltered;
  //     this.getItems();
  //   }
  // }

  // sortingCriteria: string = 'default';

  // onSort() {
  //   if (this.sortingCriteria === 'default') {
  //     this.items = this.categoryFiltered;
  //   } else {
  //     this.sortItems();
  //   }
  // }

  // sortItems() {
  //   const filteredItems = [...this.items];

  //   if (this.sortingCriteria === 'rating') {
  //     filteredItems.sort((a, b) => b.rating - a.rating);
  //   } else if (this.sortingCriteria === 'price') {
  //     filteredItems.sort((a, b) => a.price - b.price);
  //   }

  //   this.items = filteredItems;
  // }


  

