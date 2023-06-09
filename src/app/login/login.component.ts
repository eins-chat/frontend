import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private apiClient: ApiClientService) {}

  async ngOnInit() {
    if (await this.apiClient.validateSession()) {
      this.router.navigate(['/chat']);
    }
  }

  async login() {
    const token = await this.apiClient.login(this.username, this.password);
    localStorage.setItem('token', token);
    localStorage.setItem('username', this.username); //TODO
    this.router.navigate(['/chat']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
