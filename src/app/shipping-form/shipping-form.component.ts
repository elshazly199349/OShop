import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/Order';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart')cart: ShoppingCart;
  shipping: {} = {};
  userId: string;
  userSubscription: Subscription;

  constructor(private authService: AuthService,
    private orderService: OrderService,
    private router: Router) { }

  async ngOnInit() {
    this.userSubscription = this.authService.appUser$.subscribe(user => this.userId = user.$key);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-cussess', result.key]);
  }
}
