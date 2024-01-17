import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TodoAngular';
  rutas=[
    {icon:'now-ui-icons design_app',
     link:'/',
     name:'Dashboard'
    },
    {icon:'now-ui-icons education_atom',
     link:'/notas',
     name:'NOTAS'
    },
    
  ]
  
  constructor(private router: Router){
    
  }

}
