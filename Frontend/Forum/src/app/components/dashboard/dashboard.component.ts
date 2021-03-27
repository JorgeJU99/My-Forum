import { ApiService } from 'src/app/services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  user = {};
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.infoUsuarioLogin();
  }

  cerrarSesion() {
    this.authService.logOut();
  }

  infoUsuarioLogin() {
    this.apiService.get('usuarioLogin').subscribe(
      (data) => {
        this.user = data.usuario[0].username;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
