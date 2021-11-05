import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import {ToastrService} from 'ngx-toastr';
import * as $ from 'jquery';
import {AlerteService} from './shared/alerte.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isSignedIn: boolean;
  // $path = storage_path();
  // isAdmin:boolean;
  
  constructor(
    private auth: AuthStateService,
    public authService: AuthService,
    public router: Router,
    public token: TokenService,
    // pour les alertes
    private toastr: ToastrService,
  ) {
    this.showSuccess();
  }

// pour afficher l'alerte
  showSuccess()
  {
    this.toastr.success('Bienvenue','Pari-Hassmar');
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
function storage_path() {
  throw new Error('Function not implemented.');
}

