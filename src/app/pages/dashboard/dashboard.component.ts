import { Component } from '@angular/core';
import { NotasService } from '../../services/notas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  estadistica:any
  constructor(private notaService:NotasService){

  }
  ngOnInit(){
    this.notaService.getTaskStatistics().subscribe(response=>{
      this.estadistica=response
      
    
      
    })
  }
}
