import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import Annotation from 'chartjs-plugin-annotation';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { OrderSum } from '../../models/OrderSum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false } }],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  sum2022: number = 0
  sum2023: number = 0
  sum2024: number = 0
  sumForMonth2022: number[] = []
  sumForMonth2023: number[] = []
  sumForMonth2024: number[] = []
  constructor(private orderService: OrderService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.orderService.getSum('2022').subscribe(data => this.sum2022 = data)
    this.orderService.getSum('2023').subscribe(data => this.sum2023 = data)
    this.orderService.getSum('2024').subscribe(data => this.sum2024 = data)
    this.orderService.getSumAndMonth('2022').subscribe(data => {
      this.sumForMonth2022 = this.setSum(data)
      this.updateLineChartData('2022');
    })
    this.orderService.getSumAndMonth('2023').subscribe(data => {
      this.sumForMonth2023 = this.setSum(data)
      this.updateLineChartData('2023');
    })
    this.orderService.getSumAndMonth('2024').subscribe(data => {
      this.sumForMonth2024 = this.setSum(data)
      this.updateLineChartData('2024');
    })
  }

  setSum(data: OrderSum[]): number[] {
    const monthlySums: number[] = Array(12).fill(0);

    data.forEach((entry: OrderSum) => {
      const monthIndex = entry.month - 1;
      monthlySums[monthIndex] += entry.sum;
    });

    return monthlySums
  }

  updateLineChartData(label: string): void {
    const dataset = this.lineChartData.datasets.find(ds => ds.label === label);

    if (dataset) {
      const sumForMonth = this.getSumForMonth(label);
      dataset.data = sumForMonth;
    }
  }

  getSumForMonth(year: string): number[] {
    switch (year) {
      case '2022':
        return this.sumForMonth2022;
      case '2023':
        return this.sumForMonth2023;
      case '2024':
        return this.sumForMonth2024;
      default:
        return [];
    }
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        label: '2022',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        label: '2023',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        label: '2024',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
  }

  public showCurrentYear(): void {
    this.chart?.hideDataset(0, true);
    this.chart?.hideDataset(1, true);
    this.chart?.hideDataset(2, false);
  }

  public hideOne(num: number): void {
    const isHidden = this.chart?.isDatasetHidden(num);
    this.chart?.hideDataset(num, !isHidden);
  }
}
