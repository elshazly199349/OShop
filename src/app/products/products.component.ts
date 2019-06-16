import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/Product';
import { ProductService } from './../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit,OnDestroy{
  category:string;
  products:Product[]=[];
  filteredProducts:Product[]=[];
  subscription:Subscription;
  shoppingCart:ShoppingCart;

  constructor(productService:ProductService,route:ActivatedRoute,private shoppingCartService:ShoppingCartService,) {

    this.subscription=productService.getAll().switchMap(products=>{
      this.products=products;
      return route.queryParamMap;
    }).subscribe(params=>{
        this.category=params.get('category');
        this.filteredProducts=this.category? this.products.filter(p=>p.category==this.category):this.products;
      });
  }

   async ngOnInit(){
     this.subscription=(await this.shoppingCartService.getCart()).subscribe(cart=>this.shoppingCart=cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
