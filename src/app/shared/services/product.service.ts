import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  getAll(){
    return this.db.list('/products');
  }

  getById(productId){
    return this.db.object('/products/' + productId);
  }

  create(product){
    return this.db.list('/products').push(product);
  }
  
  update(productId,product){
   return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
