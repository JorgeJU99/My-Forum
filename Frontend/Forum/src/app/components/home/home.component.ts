import { Component, OnInit } from '@angular/core';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faCoffee = faBlog;

  constructor() {}

  ngOnInit(): void {}
}
