import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  name: string;
  email: string;
  password: string;
  role: string[];
  service: string;
  sous_service: string;
  password_confirmation: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  
  // public role: string[] | undefined = [];
  user : User[] = [];

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }

//   isAdmin():Boolean{
//     if(!this.user.forEach)
//     return false;
//     return (this.role.indexOf('admin') > -1); 
// }

public loggedUser: string | undefined;
public isLoggedIn: boolean | undefined= false;
public role: String[] | undefined = [];

SignIn(user :User): Boolean{
    let validUser: Boolean = false;
    this.user.forEach((curUser) => {
        if(user.name === curUser.name && user.password== curUser.password){
            validUser = true;
            this.loggedUser = curUser.name;
            this.isLoggedIn = true;
            this.role = curUser.role;
            localStorage.setItem('loggedUser',this.loggedUser);
            localStorage.setItem('isLoggedIn', String(this.isLoggedIn));
        }
    });
    return validUser;
}

isAdmin():Boolean{
    if(!this.role)
    return false;
    return (this.role.indexOf('admin') > -1); 
}


}

