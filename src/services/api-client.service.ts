import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}

  async register(username: string, password: string) {
    return new Promise<string>((resolve) => {
      this.httpClient
        .post<string>('http://localhost:3000/register', {
          username: username,
          password: password,
        })
        .subscribe((token) => {
          resolve(token);
        });
    });
  }

  async login(user: User) {
    return new Promise<string>((resolve) => {});
  }
}
