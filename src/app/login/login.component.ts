import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/services/api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private router: Router, private apiClient: ApiClientService) {}

  ngOnInit(): void {}
  async login() {
    const token = await this.apiClient.login(this.username, this.password);
    localStorage.setItem('token', token);
    this.router.navigate(['/chat']);
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
