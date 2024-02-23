import express, { Express } from "express";
import dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import * as controllers from './controllers/index';
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
// Middleware to parse JSON
app.use(bodyParser.json());

// Define routes
app.get('/', (req,res) => res.send("<h1>Welcome to the Dry Cleaning Management System</h1>"));
app.post('/customers', controllers.addCustomer);
app.patch('/customers/:id', controllers.updateCustomer);
app.get('/customers/:id', controllers.getCustomer);
app.get('/customers', controllers.getCustomers);
app.get('/services', controllers.getServices);
app.post('/orders', controllers.createOrder);
app.patch('/orders/:id', controllers.updateOrder);
app.get('/orders', controllers.getOrders);
app.get('/orders/:id', controllers.getOrder);
app.get('/orders/filial/:filialId', controllers.getOrdersByFilialId);
app.get('/orders/sum/:year', controllers.getSum);
app.get('/orders/month/:year', controllers.getSumAndMonth);
app.get('/filials', controllers.getFilials);
app.get('/serviceTypes', controllers.getServiceTypes);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});