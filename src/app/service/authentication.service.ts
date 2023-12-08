import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  updateLoginStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }
  constructor(private http: HttpClient) {}

  login(phoneNumber: string, password: string) {
    return this.http.post('https://localhost:44383/api/LoginCustomer/Process', { phoneNumber, password })
  }
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
