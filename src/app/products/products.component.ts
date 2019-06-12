import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/Product';
import { ProductService } from './../product.service';
import { Component, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnDestroy{
  category:string;
  products:Product[]=[];
  filteredProducts:Product[]=[];
  subscription:Subscription;
  
  constructor(productService:ProductService,route:ActivatedRoute) {
    
     this.subscription=productService.getAll().switchMap(products=>{
      this.products=products;
      return route.queryParamMap;
    }).subscribe(params=>{
        this.category=params.get('category');
        this.filteredProducts=this.category? this.products.filter(p=>p.category==this.category):this.products;
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
