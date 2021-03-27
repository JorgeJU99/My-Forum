import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class Register {
  public nombre: string;
  public apellido: string;
  public username: string;
  public userpassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model = new Register();

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerCliente(form) {
    this.apiService.save('usuarios', form.value).subscribe(
      (res) => {
        if (res.estado) {
          this.toastr.success('Registrado con éxito!', 'Notificación!');
          this.router.navigate(['/login']);
        }
        if (!res.estado) {
          this.toastr.error('No se logro crear la cuenta!', 'Notificación!');
        }
      },
      (err) => {
        this.toastr.error('No se logro crear la cuenta!', 'Notificación!');
      }
    );
  }

  onSubmit(form) {
    this.registerCliente(form);
  }
}
