import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$:Observable<any>;
  constructor(private authService:AuthService,private orderService:OrderService) { }

  ngOnInit() {
    this.orders$=this.authService.appUser$.switchMap(u=>this.orderService.getOrdersByUserId(u.$key));
  }

}
