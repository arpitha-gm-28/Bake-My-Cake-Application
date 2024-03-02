import { Component, Input } from '@angular/core';
import { Item } from '../models/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item?: Item;

  ngOnInit(): void {
  }
  
constructor(private router: Router){}

goToOrderView(){
 this.router.navigate([`/order/${this.item.id}`], { state: { item: this.item } });
}

getRatingClass(rating: number): string {
  if (rating <= 2) {
    return 'low-rating';
  } else if (rating <= 3) {
    return 'medium-rating';
  } else {
    return 'green';
  }
}

}
