import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
export class Publicacion {
  public titulo: string;
  public mensaje: string;
}
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  model = new Publicacion();
  user = { id: '', nombre: '', apellido: '', username: '', userpassword: '' };

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.infoUsuarioLogin();
  }

  infoUsuarioLogin() {
    this.apiService.get('usuarioLogin').subscribe(
      (data) => {
        this.user = data.usuario[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  registerPublicacion(form) {
    form.value.usuario = this.user;
    this.apiService.save('publicaciones', form.value).subscribe(
      (res) => {
        if (res.estado) {
          this.router.navigate(['/dashboard/forum']);
          this.toastr.info('Publicación realizada!', 'Notificación!');
          this.borrarForm();
        }
        if (!res.estado) {
          this.toastr.error(
            'No se logro realizar la publicación!',
            'Notificación!'
          );
        }
      },
      (err) => {
        this.toastr.error(
          'No se logro realizar la publicación!',
          'Notificación!'
        );
      }
    );
  }

  borrarForm() {
    this.model.titulo = '';
    this.model.mensaje = '';
  }

  onSubmit(form) {
    this.registerPublicacion(form);
  }
}
