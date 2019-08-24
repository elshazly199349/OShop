import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/Order';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string;
  order$:Observable<Order>;

  constructor(private router: ActivatedRoute,
    private orderService: OrderService) { }

  async ngOnInit() {
    this.orderId = this.router.snapshot.paramMap.get('id');
    this.order$=this.orderService.getOrderById(this.orderId);
  }
}
