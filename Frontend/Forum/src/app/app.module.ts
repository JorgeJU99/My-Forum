import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './services/auth.guard';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbModule,
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForumComponent } from './components/forum/forum.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublicacionComponent } from './components/utilities/publicacion/publicacion.component';
import { ResponderComponent } from './components/utilities/responder/responder.component';
import { ListacomentariosComponent } from './components/utilities/responder/listacomentarios/listacomentarios.component';
import { ListapublicacionComponent } from './components/utilities/responder/listapublicacion/listapublicacion.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent,
    DashboardComponent,
    PublicacionComponent,
    ResponderComponent,
    ListacomentariosComponent,
    ListapublicacionComponent,
  ],
  providers: [
    BnNgIdleService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
