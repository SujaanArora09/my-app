import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GreetComponent } from './greet/greet.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'greet', component: GreetComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'customer/new', component: CustomerFormComponent },
  { path: 'customer/update/:id', component: CustomerFormComponent },
  { path: 'customer/get/:id', component: CustomerFormComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];
