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

  constructor(private fb: FormBuilder ,private router: Router) {
    this.loginForm = this.fb.group({
      username: '',
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      axios.post('http://localhost:8080/api/auth/signin',this.loginForm.value)
      .then(function (response) {
        console.log(response.data.username);
        console.log(response.data.accessToken);
        localStorage.setItem("accessToken",response.data.accessToken);
            
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
    this.router.navigate(['/greet']);   
  }
}
