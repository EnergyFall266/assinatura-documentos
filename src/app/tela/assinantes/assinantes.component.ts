import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-assinantes',
  templateUrl: './assinantes.component.html',
  styleUrls: ['./assinantes.component.scss']
})
export class AssinantesComponent {
  signers: any[] = [
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
  ]
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;
  



  constructor(private messageService: MessageService) {}



  deleteSigner(signer: any) {
      this.messageService.add({ severity: 'info', summary: 'Assinante Deletado', detail: signer.name });
  }
}
