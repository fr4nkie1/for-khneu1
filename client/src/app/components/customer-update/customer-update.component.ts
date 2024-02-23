import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerReq } from '../../models/CustomerReq';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.scss'
})
export class CustomerUpdateComponent implements OnInit {
  customerId: number = 0;
  myForm = new FormGroup({
    "firstName": new FormControl("", Validators.required),
    "lastName": new FormControl("", Validators.required),
    "surName": new FormControl("", Validators.required),
    "phoneNumber": new FormControl("", Validators.required)
  });

  constructor(private customerService: CustomerService, private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.params['id'];
    this.customerService.getCustomer(this.customerId).subscribe(data =>
      {
        this.myForm.setValue({
          "firstName": data.firstName,
          "lastName": data.lastName,
          "surName": data.surName,
          "phoneNumber": data.phoneNumber,
        })
      })
  }

  submit() {
    var body = this.myForm.value as CustomerReq
    this.customerService.updateCustomer(this.customerId, body).subscribe(
      (response: string) => {
        console.log('Request successful', response);
        this.router.navigateByUrl('customers')
        this.alertSuccess()
      },
      (error) => {
        console.error('Error submitting request', error);
        this.handleError()
      }
    );;
  }

  alertSuccess() {
    this.snackBar.open('Клієнт успішно оновлено', 'Close', {
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
