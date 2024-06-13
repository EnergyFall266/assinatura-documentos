import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { VP_BPM } from 'src/beans/VP_BPM';

@Component({
  selector: 'app-documentos-assinantes',
  templateUrl: './documentos-assinantes.component.html',
  styleUrls: ['./documentos-assinantes.component.scss'],
})
export class DocumentosAssinantesComponent {
  @Input() vp!: VP_BPM;
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
  ];
  documents: any[] = [
    {
      name: 'Document 1',
      size: '50kb',
      type: 'PDF',
    },
    {
      name: 'Document 2',
      size: '150kb',
      type: 'PDF',
    },
    {
      name: 'Document 3',
      size: '100kb',
      type: 'PDF',
    },
    {
      name: 'Document 4',
      size: '200kb',
      type: 'PDF',
    },
    {
      name: 'Document 5',
      size: '250kb',
      type: 'PDF',
    },
    {
      name: 'Document 6',
      size: '80kb',
      type: 'PDF',
    },
    {
      name: 'Document 7',
      size: '40kb',
      type: 'PDF',
    },
    {
      name: 'Document 8',
      size: '300kb',
      type: 'PDF',
    },
    {
      name: 'Document 9',
      size: '75kb',
      type: 'PDF',
    },
    {
      name: 'Document 10',
      size: '65kb',
      type: 'PDF',
    },
  ];
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;
  acaoSignatario: string[] = [
    'Assinatura Obrigatória',
    'Assinatura Pioneira',
    'Assinatura em Cópia',
    'Assinatura em Cópia - Antes de Assinar',
    'Assinatura via Link',
  ];
  acaoSelecionada: string = '';
  assinaturaCertificado: string[] = ['Desabilitado', 'Opcional', 'Obrigatório'];
  assinaturaSelecionada: string = '';
  value: string = '';
  listaDeArquivos: any[] = [];

  constructor(private messageService: MessageService) {}

  deleteDocument(document: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Documento Excluido',
      detail: document.name,
    });
  }
  onBasicUploadAuto(event: any, fileUpload: any) {
    console.log(event);

    for (let file of event.files) {
      this.listaDeArquivos.push(file);
    }

    console.log(this.listaDeArquivos);
    console.log(event.files);
    fileUpload.clear();
  }
  deleteSigner(signer: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Assinante Deletado',
      detail: signer.name,
    });
  }
}
