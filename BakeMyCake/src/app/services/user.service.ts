import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  loggedIn: boolean = false;
  public authenticatedUser: User | null = null;

  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchUsersFromServer();
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    this.authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
  }

  private fetchUsersFromServer() {
    this.http.get<User[]>(this.usersUrl).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching user data from the server', error);
      }
    );
  }

  authenticate(email: string, password: string): string | null {
    if (this.loggedIn) {
        return 'Please logout first';
    }
    const user = this.users.find((user) => user.email === email && user.password === password);
    if (user) {
      this.loggedIn = true;
      this.authenticatedUser = user;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('authenticatedUser', JSON.stringify(user));
      return null;
    }
    this.loggedIn = false;
    this.authenticatedUser = null;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('authenticatedUser');
    return 'Invalid login credentials'; 
  }
  

  logout() {
    this.loggedIn = false;
    this.authenticatedUser = null;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('authenticatedUser');
  }
  

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
  getUser(): User | null {
    return this.authenticatedUser;
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  isEmailTaken(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  box() {
      this.snackBar.open('Please login first.', 'Close', { duration: 3000 });
}

hasAdminRole(): boolean {
  const user = this.getUser();
  return user ? user.role === 'administrator' : false;
}

}





  // authenticate(username: string, email: string, password: string): User | undefined {
