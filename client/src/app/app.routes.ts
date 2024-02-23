import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiceComponent } from './components/service/service.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderNewComponent } from './components/order-new/order-new.component';
import { FilialComponent } from './components/filial/filial.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { CustomerUpdateComponent } from './components/customer-update/customer-update.component';
import { FilialOrdersComponent } from './components/filial-orders/filial-orders.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "services", component: ServiceComponent },
  { path: "customers/register", component: CustomerRegisterComponent, pathMatch: 'full' },
  { path: "customers", component: CustomerComponent },
  { path: "customers/upd/:id", component: CustomerUpdateComponent },
  { path: "orders", component: OrderListComponent },
  { path: "orders/:id", component: OrderNewComponent },
  { path: "orders/filial/:filialId", component: FilialOrdersComponent },
  { path: "orders/upd/:id", component: OrderUpdateComponent, pathMatch: 'full' },
  { path: "filials", component: FilialComponent }
];
