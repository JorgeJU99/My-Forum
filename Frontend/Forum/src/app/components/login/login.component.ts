import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class Login {
  public username: string;
  public userpassword: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model = new Login();
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  loginUsuario(form) {
    this.authService.signUp(form.value).subscribe(
      (res) => {
        if (res.estado) {
          this.toastr.success('Bienvenido al Forum!', 'Notificación!');
          this.router.navigate(['/forum']);
          localStorage.setItem('token', res.token);
        }
        if (!res.estado) {
          this.toastr.error('Usuario y Contraseña Invalidos!', 'Notificación!');
        }
      },
      (err) => {
        this.toastr.error('No inicio sesion!', 'Notificación!');
      }
    );
  }

  onSubmit(form) {
    this.loginUsuario(form);
  }
}
