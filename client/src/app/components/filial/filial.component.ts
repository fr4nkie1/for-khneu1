import { Component, OnInit } from '@angular/core';
import { FilialRes } from '../../models/FilialRes';
import { FilialService } from '../../services/filial.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filial.component.html',
  styleUrl: './filial.component.scss'
})
export class FilialComponent implements OnInit{
  filials: FilialRes[] = [];

  constructor(private service: FilialService) { }

  ngOnInit(): void {
    this.service.getFilials().subscribe(filials => {
      if (Array.isArray(filials)) {
        this.filials = filials;
      } else {
        console.error('Unexpected data format:', filials);
      }
    });
  }
}
