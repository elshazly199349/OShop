import { Product } from './../../models/Product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products:Product[];
  subscribtion:Subscription;
  dataTableSource:DataTableResource<Product>;
  items:Product[]=[];
  itemCount:number;

  constructor(private productService:ProductService) { 
     this.subscribtion=this.productService.getAll().subscribe(products=>
      {
        this.products=products;
        this.initializeTable(products);
      });
  }

private initializeTable(products:Product[]){
  this.dataTableSource=new DataTableResource(products);
  this.dataTableSource.query({offset:0})
  .then(items=>this.items=items);
  this.dataTableSource.count()
  .then(count=>this.itemCount=count);
}


reloadItems(params){
  if(!this.dataTableSource)return;

  this.dataTableSource.query(params)
  .then(items=>this.items=items);
}

  filter(query:string){
    let filteredProducts=query?this.products.filter(p=>p.title.toLocaleLowerCase().includes(query.toLowerCase())):this.products;
    this.initializeTable(filteredProducts);
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
}
