import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { deleteDocument } from 'prisma_prismafunctions';
import { VP_BPM } from 'src/beans/VP_BPM';

@Component({
  selector: 'app-busca-assinantes',
  templateUrl: './busca-assinantes.component.html',
  styleUrls: ['./busca-assinantes.component.scss']
})
export class BuscaAssinantesComponent {
  @Input() vp!: VP_BPM;

  usuariosInternos: any[] = [
    {
      name: 'Signer 1',
      email: 'signer1@hotmail.com',
    },
    {
      name: 'Signer 2',
      email: 'signer2@hotmail.com',
    },
    {
      name: 'Signer 3',
      email: 'signer3@hotmail.com',
    },
    {
      name: 'Signer 4',
      email: 'signer4@hotmail.com',
    },
    {
      name: 'Signer 5',
      email: 'signer5@hotmail.com',
    },
    {
      name: 'Signer 6',
      email: 'signer6@hotmail.com',
    },
    {
      name: 'Signer 7',
      email: 'signer7@hotmail.com'
    },
    {
      name: 'Signer 8',
      email: 'signer8@hotmail.com' 
    },

  ]
  selectedUsuario: any = [];
  constructor(private messageService: MessageService) { }
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;
  nomeExterno:string = "";
  emailExterno:string = "";
  telefoneExterno:string = "";

  
}
