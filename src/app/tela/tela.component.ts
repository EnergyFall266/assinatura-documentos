import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { AppService } from '../app.service';


@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss'],
})
export class TelaComponent {
  @Input() vp!: VP_BPM;
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;

  constructor(private appService: AppService) {
    
 
  }
  ngOnInit() {
    this.getUsuariosInternos();
  }

 async getUsuariosInternos() {
  
    let usuarios = await this.appService.usuariosInternos( this.vp.token)
    console.log(usuarios.users);
   usuarios.users.forEach((element: any) => {
      this.vp.listaUsuariosInternos.push({
        nome: element.fullName,
        email: element.email,
        
      });
   });
   console.log(this.vp.listaUsuariosInternos);
   
      

  }
}
