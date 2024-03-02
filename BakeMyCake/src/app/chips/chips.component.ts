import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  categories: string[] = ['Cake', 'Brownie', 'Cookie'];
  selectedCategory: string = '';

  // @Output() sortEvent = new EventEmitter<string>();

  // onSortChange(event: MatSelectChange) {
  //   this.sortEvent.emit(event.value);
  // }

  @Output() categoryChanged = new EventEmitter<string>(); 

   onCategoryChange(){
  this.categoryChanged.emit(this.selectedCategory);
}

}
