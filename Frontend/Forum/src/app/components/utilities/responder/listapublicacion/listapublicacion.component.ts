import { Component, OnInit, Input } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listapublicacion',
  templateUrl: './listapublicacion.component.html',
  styleUrls: ['./listapublicacion.component.css'],
})
export class ListapublicacionComponent implements OnInit {
  faUserCircle = faUserCircle;
  @Input() publicacion: {
    username: '';
    nombre: '';
    apellido: '';
    fecha: '';
    titulo: '';
    mensaje: '';
  };
  constructor() {}

  ngOnInit(): void {}
}
