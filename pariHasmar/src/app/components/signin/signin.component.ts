import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;
  userModelAuth : User = new User;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
      role: []
    })
  }

  ngOnInit() { } 

  onSubmit() {
      this.authService.signin(this.loginForm.value).subscribe(
        result => {
          this.responseHandler(result);
        },
        error => {
          this.errors = error.error;
        },() => {
          this.authState.setAuthState(true);
          this.loginForm.reset();
          this.router.navigate(['profile']);
    
          // if(this.userModelAuth.role === ['admin'])
          // {
          //   return this.router.navigate(['profile']);
          // }else if(this.userModelAuth.role === ['user']){
          //   return this.router.navigate(['services']);
          // }else{ 
          //   return alert('error');
          // }
          
          // if(this.loginForm['role'] === 'admin'){
          //   this.router.navigate(['profile']);
          // }else{
          //   this.router.navigate(['alertes']);
          // }
        }
      );
  }

  // Handle response
  responseHandler(data){
    this.token.handleData(data.access_token);
  }

}
