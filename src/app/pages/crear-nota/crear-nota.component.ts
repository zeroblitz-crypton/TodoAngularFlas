import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotasService } from '../../services/notas.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.component.html',
  styleUrl: './crear-nota.component.scss'
})
export class CrearNotaComponent {
  isEdit = false;
  formulario: FormGroup;
  notaId: number=0; // Variable para almacenar el ID de la nota a editar
  constructor(
    private fb: FormBuilder,
    private notasService: NotasService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formulario = this.fb.group({
      nota: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.notaId = +params['id'];
        this.notasService.getTaskById(this.notaId).subscribe(response => {
          this.formulario.patchValue({
            nota: response.task[1]
          });
        });
      }
    });
  }

  guardar() {
    const notaForm = this.formulario.value;
    if (this.isEdit) {
      // Lógica para editar la nota usando this.notaId y notaForm
      this.notasService.updateTask(this.notaId, notaForm.nota, false).subscribe(response => {
        // Manejar la respuesta o realizar acciones adicionales
        this.mensajeSuccess("Genial!!","Se edito correctamente")
        this.router.navigate(['/notas']);  // Redirigir después de editar
        
      });
    } else {
      // Lógica para guardar la nueva nota
      this.notasService.addTask(notaForm.nota, false).subscribe(response => {
        // Manejar la respuesta o realizar acciones adicionales
        this.mensajeSuccess("Genial!!","Se guardo correctamente")
        this.router.navigate(['/notas']);  // Redirigir después de agregar
        
      });
    }
   
    
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
