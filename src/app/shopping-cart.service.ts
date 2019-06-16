import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/Product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }


async getCart():Promise<Observable<ShoppingCart>>{
  let cartId=await this.getOrCreateCartId();
  return await this.getById(cartId).map(res=>new ShoppingCart(res.items));
}

async addToCart(product:Product){
  this.updateCartItem(product,1);
}

async removeFromCart(product:Product){
 this.updateCartItem(product,-1);
}

async clearCart(){
  let cartId=await this.getOrCreateCartId();
  this.db.object('/shopping-carts/'+cartId+'/items').remove();
}

 private async getOrCreateCartId():Promise<string>{
    let cartId=localStorage.getItem('cartId');
    if(cartId)return cartId;

    let result=await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  private getCartItem(productId:string,cartId:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId)
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    });
}

private  getById(cartId:string){
  return this.db.object('/shopping-carts/'+cartId);
}

  private async updateCartItem(product:Product,change:number){
    let cartId=await this.getOrCreateCartId();
    let item$=this.getCartItem(product.$key,cartId);
    item$.take(1).subscribe(item=>{
      item$.update({
        title:product.title,
        price:product.price,
        imageUrl:product.imageUrl,
         quantity:(item.quantity|| 0) +change 
        });
    });
  }

}
