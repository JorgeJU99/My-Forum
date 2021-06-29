import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private URLBACKEND = 'http://192.168.1.100:3000/';
  private fileList: string[] = new Array<string>();
  private fileList$: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient, private router: Router) {}

  save(path, data) {
    return this.http.post<any>(this.URLBACKEND + path, data);
  }
  get(path) {
    return this.http.get<any>(this.URLBACKEND + path);
  }
  getId(path, data) {
    return this.http.get<any>(this.URLBACKEND + path + '/' + data);
  }

  getOneId(path, data) {
    return this.http.get<any>(this.URLBACKEND + path + '/' + data);
  }

  delete(path, data) {
    return this.http.delete<any>(this.URLBACKEND + path + '/' + data);
  }

  update(path, data) {
    return this.http.put<any>(this.URLBACKEND + path + '/' + data.id, data);
  }
  registerClientes(path, data) {
    return this.http.post<any>(this.URLBACKEND + path, data);
  }
}
