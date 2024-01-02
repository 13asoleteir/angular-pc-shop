import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('token') === 'true';
  }

  login(email: string, password: string): Promise<void> {
    return this.fireauth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Login Successful');
        localStorage.setItem('token', 'true');
        this.router.navigate(['/home']);
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/login']);
      });
  }

  logout(): Promise<void> {
    return this.fireauth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  register(email: string, password: string): Promise<void> {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }
}
