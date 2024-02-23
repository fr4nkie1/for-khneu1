import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CustomerRes } from '../../models/CustomerRes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customers: CustomerRes[] = []

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => this.customers = data);
  }
}
