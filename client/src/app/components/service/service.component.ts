import { Component, OnInit } from '@angular/core';
import { Service } from '../../models/Service';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getServices().subscribe(services => {
      if (Array.isArray(services)) {
        this.services = services;
      } else {
        console.error('Unexpected data format:', services);
      }
    });
  }
}
