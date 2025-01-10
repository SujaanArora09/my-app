import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule],
})
export class CustomerComponent implements OnInit {
  customers: any[] = [];
  isAdmin: boolean = false;  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  async loadCustomers() {
    const token = localStorage.getItem('accessToken');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');  

    if (roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;  
    }

    if (token) {
      try {
        const response = await axios.get('http://localhost:8080/api/customer/customers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
        alert('Unauthorized access. Please log in as an admin.');
      }
    } else {
      console.error('No token found');
      alert('No token found. Please log in.');
    }
  }

  showCustomer(id: number) {
    this.router.navigate([`/customer/get/${id}`]);
  }

  editCustomer(id: number) {
    this.router.navigate([`/customer/update/${id}`]);
  }

  async deleteCustomer(id: number) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await axios.delete(`http://localhost:8080/api/customer/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Customer deleted successfully!');
        this.loadCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Unauthorized action or an error occurred.');
      }
    } else {
      alert('No token found. Please log in.');
    }
  }

  createCustomer() {
    this.router.navigate(['/customer/new']);
  }
}
