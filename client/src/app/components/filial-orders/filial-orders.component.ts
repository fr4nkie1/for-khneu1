import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderRes } from '../../models/OrderRes';

@Component({
  selector: 'app-filial-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filial-orders.component.html',
  styleUrl: './filial-orders.component.scss'
})
export class FilialOrdersComponent implements OnInit {
  filialId: number = 0
  orders: OrderRes[] = []
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.filialId = this.activatedRoute.snapshot.params['filialId'];
    this.orderService.getOrdersByFilialId(this.filialId).subscribe(orders => {
      if (Array.isArray(orders)) {
        this.orders= orders;
      } else {
        console.error('Unexpected data format:', orders);
      }
    });
  }
}
