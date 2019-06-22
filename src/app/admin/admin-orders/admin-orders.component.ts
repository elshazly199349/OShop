import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$:Observable<any>;
  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.orders$=this.orderService.getOrders();
  }

}
