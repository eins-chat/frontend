import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group, Message } from 'src/app/models/models';
import { environment } from './../environments/environment';
const API_BASE_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}

  async register(username: string, password: string) {
    return new Promise<string>((resolve) => {
      this.httpClient
        .post<TokenResponse>(`${API_BASE_URL}/register`, {
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
        .post<TokenResponse>(`${API_BASE_URL}/login`, {
          username: username,
          password: password,
        })
        .subscribe((res) => {
          resolve(res.token);
        });
    });
  }

  async validateSession(): Promise<boolean> {
    const token = localStorage.getItem('token') || '';

    return new Promise<boolean>((resolve) => {
      this.httpClient
        .post(
          `${API_BASE_URL}/validateSession`,
          {},
          {
            observe: 'response',
            headers: {
              Authorization: token,
            },
          }
        )
        .subscribe((res) => {
          resolve(res.status === 200);
        });
    });
  }

  async getMessages() {
    return new Promise<Message[]>((resolve) => {
      const token = localStorage.getItem('token');
      if (token) {
        this.httpClient
          .get<Message[]>(`${API_BASE_URL}/messages`, {
            headers: {
              Authorization: token,
            },
          })
          .subscribe((res) => {
            resolve(res);
          });
      }
    });
  }

  async getUsers(name: string) {
    return new Promise<string[]>((resolve) => {
      const token = localStorage.getItem('token');
      if (token) {
        this.httpClient
          .get<string[]>(`${API_BASE_URL}/users/` + name, {
            headers: {
              Authorization: token,
            },
          })
          .subscribe((res) => {
            resolve(res);
          });
      }
    });
  }

  createGroup(memberList: string[]) {
    return new Promise<string>((resolve) => {
      this.httpClient
        .post<Group>(`${API_BASE_URL}/createGroup`, {
          memberList: memberList,
        })
        .subscribe((res) => {
          resolve(res.id);
        });
    });
  }
}

type TokenResponse = {
  token: string;
};
