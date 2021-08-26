import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://192.170.0.100:3000/';

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user): any {
    return this.http.post<any>(this.URL + 'login', user);
  }

  loggedIn(): any {
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logOut(): any {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
