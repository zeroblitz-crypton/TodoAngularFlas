import { Component } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.scss'
})
export class NotasComponent {
  notas:any;
  constructor(private notaService:NotasService){

  }
  ngOnInit(){
    this.listarNotas()
  }

  listarNotas(){
    this.notaService.getAllTasks().subscribe(response=>{
      this.notas=response
      this.notas=this.notas.todolist
      console.log(this.notas);
      
    })
  }

  eliminarNota(idTask:any){
    this.notaService.deleteTask(idTask).subscribe(response=>{
      console.log(response);
      this.listarNotas()
    })
    this.mensajeSuccess("Bien!!","Se elimino correctamente")
  }
  cambiarEstadoNota(idTask:any){
    this.notaService.changeTaskStatus(idTask).subscribe(response=>{
      console.log(response);
      this.listarNotas()
    })
    this.mensajeSuccess("Bien!!","Se cambio el estado de la nota")
  }
  mensajeSuccess(titulo:any,texto:any){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}
