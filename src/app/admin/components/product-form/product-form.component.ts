import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import 'rxjs/add/operator/take'
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product:any={};
  id;
  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute) { 
    
      this.categories$=this.categoryService.getAll();
     this.id= this.route.snapshot.paramMap.get('id');

    if(this.id) this.productService.getById(this.id).take(1).subscribe(p=>this.product=p);
    
  }

  save(product){  
    if(this.id)this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('are you sure you want to delete this product')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
