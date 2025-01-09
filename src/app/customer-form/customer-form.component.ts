import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import axios from 'axios';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  standalone: true,
  imports: [FormsModule], // Add FormsModule to imports
})
export class CustomerFormComponent implements OnInit {
  customer: any = {
    customerId: null,
    fName: '',
    lName: '',
    email: '',
  };
  isEditMode = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadCustomerById(+id);
    }
  }

  async loadCustomerById(id: number) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await axios.get(`http://localhost:8080/api/customer/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.customer = response.data;
      } catch (error) {
        console.error('Error fetching customer:', error);
        alert('Unauthorized access or an error occurred.');
        this.router.navigate(['/customers']);
      }
    } else {
      console.error('No token found');
      alert('No token found. Please log in.');
      this.router.navigate(['/login']);
    }
  }

  async saveCustomer() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No token found. Please log in.');
      this.router.navigate(['/login']);
      return;
    }

    try {
      
        await axios.post(`http://localhost:8080/api/customer/new`, this.customer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Customer created successfully!');
      
      this.router.navigate(['/customers']);
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Unauthorized action or an error occurred.');
    }
  }
}
