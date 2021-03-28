import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css'],
})
export class PublicacionComponent implements OnInit {
  faUserCircle = faUserCircle;
  dataPublicacion = {};
  dataPublicacionFor = [];
  dataRespuesta = {};
  dataRespuestaFor = [];
  respuesta: string[] = [];
  user = { id: '', nombre: '', apellido: '', username: '', userpassword: '' };
  constructor(private apiService: ApiService) {}

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

  obtenerRespuestaComentario(id) {
    this.apiService.getOneId('respuestaspublicacion', id).subscribe(
      (res) => {
        this.dataRespuesta = res;
        console.log('Datares');
        console.log(this.dataRespuesta);
        for (
          let index = 0;
          index < Object.keys(this.dataRespuesta).length;
          index++
        ) {
          this.dataRespuestaFor.push(this.dataRespuesta[index]);
        }
      },
      (err) => {
        console.log('No se listo respuesta por comentario');
      }
    );
  }

  btnVerComentarios(id) {
    console.log(id);
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
          this.obtenerRespuestaComentario(
            this.dataPublicacion[index].idpublicacion
          );
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
