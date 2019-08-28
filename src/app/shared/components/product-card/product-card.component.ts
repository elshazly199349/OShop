import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/Product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product')product:Product;
@Input('showActions')showActions=true;
@Input('shopping-Cart')shoppingCart:ShoppingCart;

constructor(private cartService:ShoppingCartService){}

addToCart(){
  this.cartService.addToCart(this.product);
}
}
