import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EditableColumn } from 'primeng/table';
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
    this.listaDeArquivos.includes(document.name);

    this.messageService.add({
      severity: 'info',
      summary: 'Documento Excluido',
      detail: document.name,
    });
  }
  onBasicUploadAuto(event: any, fileUpload: any) {
    console.log(this.listaDeArquivos.length);
    let adicionado: boolean = false;
    if (this.listaDeArquivos.length === 0) {
      console.log('vazio');

      for (let file of event.files) {
        this.listaDeArquivos.push(file);
      }
      fileUpload.clear();
    } else {
      console.log(this.listaDeArquivos);

      for (let file of event.files) {
        console.log(file.name);

        adicionado = false;
        this.listaDeArquivos.forEach((element) => {
          if (element.name == file.name) {
            adicionado = true;
            console.log(element.name);


          }
          });
          if(adicionado){
            this.messageService.add({
              severity: 'warn',
              summary: 'Aviso',
              detail: 'Arquivo '+ file.name + ' já adicionado',
            });

            continue
          }


             else {
              this.listaDeArquivos.push(file);
            }
      }

      console.log(this.listaDeArquivos);
      console.log(event.files);
      fileUpload.clear();
    }
  }

  deleteSigner(signer: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Assinante Deletado',
      detail: signer.name,
    });
  }
}
