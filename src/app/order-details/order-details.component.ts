import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import 'rxjs/add/operator/take'
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app-user';
import { UserService } from '../user.service';
import { Order } from '../models/Order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  order$:Observable<Order>;
  user$: Observable<AppUser>;

  constructor(private router: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService) { }

  async ngOnInit() {
    this.orderId = this.router.snapshot.paramMap.get('id');
    this.order$=this.orderService.getOrderById(this.orderId);
      // this.user$=this.userService.getById();
  }
}
