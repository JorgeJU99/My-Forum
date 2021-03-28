import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css'],
})
export class ResponderComponent implements OnInit {
  faUserCircle = faUserCircle;
  dataPublicacion = {};
  dataPublicacionFor = [];
  dataComentario = {};
  dataComentarioFor = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.id);
      this.obtenerPublicacion(params.id);
      this.obtenerComentarioPublicacion(params.id);
    });
  }

  obtenerPublicacion(id) {
    this.apiService.getOneId('publicaciones', id).subscribe(
      (res) => {
        this.dataPublicacion = res;
        console.log('publicacion');
        console.log(this.dataPublicacion);
        for (
          let index = 0;
          index < Object.keys(this.dataPublicacion).length;
          index++
        ) {
          this.dataPublicacionFor.push(this.dataPublicacion[index]);
        }
      },
      (err) => {
        console.log('No se listo la publicacion');
      }
    );
  }

  obtenerComentarioPublicacion(id) {
    this.apiService.getOneId('respuestaspublicacion', id).subscribe(
      (res) => {
        this.dataComentario = res;
        console.log('comentario');
        console.log(this.dataComentario);
        for (
          let index = 0;
          index < Object.keys(this.dataComentario).length;
          index++
        ) {
          this.dataComentarioFor.push(this.dataComentario[index]);
        }
      },
      (err) => {
        console.log('No se listo la respuesta de la publicacion');
      }
    );
  }
}
