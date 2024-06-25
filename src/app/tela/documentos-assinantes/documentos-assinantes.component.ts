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

  constructor(private messageService: MessageService) { }

  deleteDocument(document: any) {
    this.vp.listaArquivos = this.vp.listaArquivos.filter(
      (doc) => doc.name !== document.name
    );

    this.messageService.add({
      severity: 'info',
      summary: 'Documento Excluido',
      detail: document.name,
    });
  }
  onBasicUploadAuto(event: any, fileUpload: any) {
    // console.log(event);
    // console.log(fileUpload);


    // console.log(this.vp.listaArquivos.length);
    let adicionado: boolean = false;
    if (this.vp.listaArquivos.length === 0) {
      // console.log('vazio');

      for (let file of event.files) {
        this.vp.listaArquivos.push(file);
        const reader: FileReader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (e) => {
          this.vp.byteArray[0] = new Uint8Array(
            e.target?.result as ArrayBuffer
          );
        };
      }
      fileUpload.clear();
    } else {
      // for (let file of event.files) {
      //   console.log(file.name);

      //   adicionado = false;
      //   this.vp.listaArquivos.forEach((element) => {
      //     if (element.name == file.name) {
      //       adicionado = true;
      //       console.log(element.name);
      //     }
      //   });
      //   if (adicionado) {
      //     this.messageService.add({
      //       severity: 'warn',
      //       summary: 'Aviso',
      //       detail: 'Arquivo ' + file.name + ' já adicionado',
      //     });

      //     continue;
      //   } else {
      //     this.vp.listaArquivos.push(file);
      //   }
      // }
      event.files.forEach((file: any, i: any) => {
        // console.log(file.name);

        adicionado = false;
        this.vp.listaArquivos.forEach((element) => {
          if (element.name == file.name) {
            adicionado = true;
            console.log(element.name);
          }
        });
        if (adicionado) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Arquivo ' + file.name + ' já adicionado',
          });
        } else {
          this.vp.listaArquivos.push(file);
          const reader: FileReader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = (e) => {
            this.vp.byteArray[i + 1] = new Uint8Array(
              e.target?.result as ArrayBuffer
            );
          };
        }
        console.log('for do byteArray')
        console.log(i)
        console.log(this.vp.byteArray)
      });

      fileUpload.clear();
    }
  }

  deleteSigner(signer: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Signatario Deletado',
      detail: signer.name,
    });
    this.vp.signatarios = this.vp.signatarios.filter(
      (signatario) => signatario.email !== signer.email
    );
  }
}
