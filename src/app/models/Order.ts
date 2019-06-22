import { ShoppingCart } from "./shopping-cart";
import { Injectable, Inject } from "@angular/core";
import { UserService } from "../user.service";
import { AppUser } from "./app-user";

@Injectable()
export class Order {
    datePlaced: number;
    isDone: boolean;
    items: any[];

    constructor( private userService: UserService,public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.isDone = false;
        this.items = shoppingCart.items.map(i => {
            return {
                product: { title: i.title, imageUrl: i.imageUrl, price: i.price },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        });
    }

    get User(): AppUser {
        console.log('hi');
        let user: AppUser;
        this.userService.getById(this.userId).subscribe(u => user = u);
        return user;
    }
}