import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css'],
})
export class ResponderComponent implements OnInit {
  faUserCircle = faUserCircle;
  @Input() respuesta: {
    username: '';
    nombre: '';
    apellido: '';
    fecha: '';
    respuesta: '';
  };
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}
}
