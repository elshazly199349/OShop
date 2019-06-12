import { Product } from './../models/Product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product')product:Product;
@Input('showActions')showActions=true;
  constructor() { }


}
