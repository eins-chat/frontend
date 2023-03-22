import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/services/api-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private apiClient: ApiClientService, private router: Router) {}
  ngOnInit(): void {}
  async register() {
    const token = await this.apiClient.register(this.username, this.password);
    localStorage.setItem('token', token);
    this.router.navigate(['/chat']);
  }
}
