import { Component, Input, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listacomentarios',
  templateUrl: './listacomentarios.component.html',
  styleUrls: ['./listacomentarios.component.css'],
})
export class ListacomentariosComponent implements OnInit {
  faUserCircle = faUserCircle;
  @Input() comentario: {
    username: '';
    nombre: '';
    apellido: '';
    fecha: '';
    respuesta: '';
  };
  constructor() {}

  ngOnInit(): void {}
}
