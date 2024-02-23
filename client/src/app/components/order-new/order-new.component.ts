import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderReq } from '../../models/OrderReq';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/Service';
import { FilialRes } from '../../models/FilialRes';
import { FilialService } from '../../services/filial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderDiffAndUrg } from '../../models/OrderDiffAndUrg';

@Component({
  selector: 'app-order-new',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './order-new.component.html',
  styleUrl: './order-new.component.scss'
})
export class OrderNewComponent implements OnInit {
  customerId: number = 0;
  services: Service[] = []
  filials: FilialRes[] = []
  difficultyOrUrgency: OrderDiffAndUrg[] = [
    new OrderDiffAndUrg(1, 'Низький'),
    new OrderDiffAndUrg(2, 'Середньо-низький'),
    new OrderDiffAndUrg(3, 'Середній'),
    new OrderDiffAndUrg(4, 'Середньо-високий'),
    new OrderDiffAndUrg(5, 'Високий')]
  statuses: OrderDiffAndUrg[] = [
    new OrderDiffAndUrg(1, 'Прийнято'),
    new OrderDiffAndUrg(2, 'В процесі'),
    new OrderDiffAndUrg(3, 'Готовий до видачі'),
    new OrderDiffAndUrg(4, 'Видано')]
  formArray: FormGroup[] = [];

  constructor(private orderService: OrderService, private serviceService: ServiceService, private filialService: FilialService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.serviceService.getServices().subscribe(data => this.services = data);
    this.filialService.getFilials().subscribe(data => this.filials = data);
    this.addForm();
  }

  addForm() {
    const newForm = this.formBuilder.group({
      "customerId": new FormControl(this.customerId, [Validators.required, Validators.pattern(/^\d+$/)]),
      "serviceId": new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
      "filialId": new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
      "urgency": new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
      "difficulty": new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
      "ordStatus": new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
      "receiveDate": new FormControl('', Validators.required),
      "returnDate": new FormControl('', Validators.required)
    });

    this.formArray.push(newForm);
  }

  duplicateForm(index: number) {
    const formToDuplicate = this.formArray[index];
    const newForm = this.formBuilder.group(formToDuplicate.value);
    this.formArray.splice(index + 1, 0, newForm);
  }

  deleteForm(index: number) {
    this.formArray.splice(index, 1);
  }

  setCustomerIdForForms() {
    this.formArray.forEach(form => {
      form.controls['customerId'].setValue(this.customerId);
    });
  }

  submit() {
    this.setCustomerIdForForms();
    this.formArray.forEach(form => {
      var body = form.value as OrderReq;
      this.orderService.addOrder(body).subscribe(
        (response: string) => {
          console.log('Request successful', response);
          this.router.navigateByUrl('orders')
          this.alertSuccess();
        },
        (error) => {
          console.error('Error submitting request', error);
          this.handleError();
        }
      );
    })
  }

  alertSuccess() {
    this.snackBar.open('Замовлення успішно створено', 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  handleError() {
    this.snackBar.open('Щось пішло не так!', 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
