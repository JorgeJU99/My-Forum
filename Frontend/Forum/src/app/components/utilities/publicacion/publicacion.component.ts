import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
})
export class PublicacionComponent implements OnInit {
  faUserCircle = faUserCircle;
  dataPublicacion = {};
  dataPublicacionFor = [];
  respuesta: string[] = [];
  user = { id: '', nombre: '', apellido: '', username: '', userpassword: '' };
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerPublicacionUsuario();
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

  btnVerComentarios(id) {
    console.log(id);
    this.router.navigate(['/dashboard/forum/respuestas/' + id]);
  }

  obtenerPublicacionUsuario() {
    this.apiService.get('publicacionesusuario').subscribe(
      (res) => {
        this.dataPublicacion = res;
        for (
          let index = 0;
          index < Object.keys(this.dataPublicacion).length;
          index++
        ) {
          this.dataPublicacionFor.push(this.dataPublicacion[index]);
        }
      },
      (err) => {
        console.log('No se listo publicacion por usuario');
      }
    );
  }

  borrarForm() {
    this.respuesta = [];
  }

  onSubmit(form, itemPublicacion) {
    form.value.idusuario = this.user;
    form.value.idpublicacion = itemPublicacion;
    this.apiService.save('respuestas', form.value).subscribe(
      (res) => {
        if (res.estado) {
          console.log('Comentario realizado');
          this.toastr.info('Comentario realizado!', 'Notificación!');
          this.borrarForm();
        }
        if (!res.estado) {
          console.log('No se pudo comentar');
        }
      },
      (err) => {
        console.log('No se pudo comentar');
      }
    );
  }
}
