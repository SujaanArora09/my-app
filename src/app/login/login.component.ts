import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', this.loginForm.value);
       
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('roles', JSON.stringify(response.data.roles)); 

        console.log('Login successful:', response.data);

        this.router.navigate(['/customers']);
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
