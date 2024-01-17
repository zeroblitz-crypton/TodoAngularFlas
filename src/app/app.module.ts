import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotasComponent } from './pages/notas/notas.component';
import { CrearNotaComponent } from './pages/crear-nota/crear-nota.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IconsComponent } from './pages/icons/icons.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NotasComponent,
    CrearNotaComponent,
    DashboardComponent,
    IconsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
