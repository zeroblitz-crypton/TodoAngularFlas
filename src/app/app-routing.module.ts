import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotasComponent } from './pages/notas/notas.component';
import { CrearNotaComponent } from './pages/crear-nota/crear-nota.component';
import { IconsComponent } from './pages/icons/icons.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'notas',component:NotasComponent},
  {path:'icons',component:IconsComponent},
  {path:'crear_nota',component:CrearNotaComponent},
  { path: 'crear_nota/:id', component: CrearNotaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
