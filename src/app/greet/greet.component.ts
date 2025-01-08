import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-greet',
  standalone: true,
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.css'],
})
export class GreetComponent implements OnInit {
  greetingMessage: string = '';

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios
        .get('http://localhost:8080/greet', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.greetingMessage = response.data;
        })
        .catch((error) => {
          console.error('Error fetching greeting:', error);
        });
    } else {
      this.greetingMessage = 'No token found. Please log in.';
    }
  }
}
