import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EditableColumn } from 'primeng/table';
import { VP_BPM } from 'src/beans/VP_BPM';

interface envelope {
  envelopeDraftId: string;
  name: string;
  documentsVersions: [string];
  envelopeDocuments: [{ documentVsersion: string; envelopePosition: number }];
  signers: [
    {
      name: string;
      email: string;
      phoneNumber?: string;
      username: string;
      askGeolocation: string;
      communicationChannel: {
        email: boolean;
        platform?: boolean;
        whatsapp?: boolean;
        sms?: boolean;
      };
      signerType: string;
      orderSign: number;
      digitalCertificate: string;
    }
  ];
  instructionsToSigner: string;
  askGeolocation: string;
  daysToExpire: number;
  envelopeBatchId: string;
  mandatoryView: boolean;
  notificateAuthor: boolean;
}
@Component({
  selector: 'app-documentos-assinantes',
  templateUrl: './documentos-assinantes.component.html',
  styleUrls: ['./documentos-assinantes.component.scss'],
})
export class DocumentosAssinantesComponent {
  @Input() vp!: VP_BPM;

  acaoSignatario: any[] = [
    {
      name: 'Assinatura Obrigatória',
      value: 'MANDATORY',
    },
    { name: 'Assinatura Pioneira', value: 'PIONEER' },
    { name: 'Assinatura em Cópia', value:'RECEIVE_COPY' },
    { name: 'Assinatura em Cópia - Antes de Assinar' , value: 'RECEIVE_COPY_BEFORE_SIGN'},

  ];

  acaoSelecionada: string = '';
  assinaturaCertificado: any[] = [
    {name: 'Obrigatório', value: 'MANDATORY'},
    {name: 'Opcional', value: 'OPTIONAL'},
    {name: 'Desabilitado', value: null}
  ];
  assinaturaSelecionada: string = '';
  value: string = '';

  constructor(private messageService: MessageService) {}

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
    let adicionado: boolean = false;
    if (this.vp.listaArquivos.length === 0) {
      for (let file of event.files) {
        this.vp.listaArquivos.push(file);
        const reader: FileReader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (e) => {
          this.vp.byteArray.push(
            new Uint8Array(e.target?.result as ArrayBuffer)
          );
        };
      }
      fileUpload.clear();
    } else {
      for (let file of event.files) {

        adicionado = false;
        this.vp.listaArquivos.forEach((element) => {
          if (element.name == file.name) {
            adicionado = true;
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
            this.vp.byteArray.push(
              new Uint8Array(e.target?.result as ArrayBuffer)
            );
          };
        }

      }

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
