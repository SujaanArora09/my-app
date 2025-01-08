import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      console.log('Sending signup data:', signupData);

      axios
        .post('http://localhost:8080/api/auth/signup', signupData)
        .then((response) => {
          console.log('Signup successful:', response.data);
          alert('Signup successful!');
        })
        .catch((error) => {
          console.error('Signup failed:', error);
          alert('Signup failed. Please try again.');
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
