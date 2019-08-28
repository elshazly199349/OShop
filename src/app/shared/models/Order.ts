import { ShoppingCart } from "./shopping-cart";
import { Injectable, Inject } from "@angular/core";
import { UserService } from "shared/services/user.service";
import { AppUser } from "./app-user";

@Injectable()
export class Order {
    datePlaced: number;
    items: any[];

    constructor( public userId: string,public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map(i => {
            return {
                product: { title: i.title, imageUrl: i.imageUrl, price: i.price },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });
    }
}