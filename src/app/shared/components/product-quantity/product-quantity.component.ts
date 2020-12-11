import { Product } from 'shared/models/Product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{
@Input('product')product:Product;
@Input('shopping-Cart')shoppingCart:ShoppingCart;
  constructor(private cartService:ShoppingCartService){}

  addToCart(){
    this.cartService.addToCart(this.product);
  }
  
removeFromCart(){
  this.cartService.removeFromCart(this.product);
}
}