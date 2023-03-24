import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private apiClient: ApiClientService, private router: Router) {}

  async ngOnInit() {
    if (await this.apiClient.validateSession()) {
      this.router.navigate(['/chat']);
    }
  }

  async register() {
    const token = await this.apiClient.register(this.username, this.password);
    localStorage.setItem('token', token);
    localStorage.setItem('username', this.username); //TODO
    this.router.navigate(['/chat']);
  }
}
