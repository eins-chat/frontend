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
        .post<TokenResponse>('http://localhost:3000/register', {
          username: username,
          password: password,
        })
        .subscribe((res) => {
          resolve(res.token);
        });
    });
  }

  async login(username: string, password: string) {
    return new Promise<any>((resolve) => {
      this.httpClient
        .post<TokenResponse>('http://localhost:3000/login', {
          username: username,
          password: password,
        })
        .subscribe((res) => {
          resolve(res.token);
        });
    });
  }
}

type TokenResponse = {
  token: string;
};
