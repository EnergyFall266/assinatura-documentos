import { Component, Input } from '@angular/core';
import { VP_BPM, envelope } from 'src/beans/VP_BPM';
import { AppService, PastaService } from '../app.service';
import { Anexo, sendDocument } from 'prisma_prismafunctions';
import { checkFolder } from 'prisma_prismafunctions';
import { timeout } from 'rxjs';
import { checkImportStatus } from 'prisma_prismafunctions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss'],
})
export class TelaComponent {
  @Input() vp!: VP_BPM;

  constructor(
    private appService: AppService,
    private pasta: PastaService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.getUsuariosInternos();
  }

  async getUsuariosInternos() {
    let usuarios = await this.appService.usuariosInternos(this.vp.token, 0);
    console.log(usuarios.users);
    usuarios.users.forEach((element: any) => {
      this.vp.listaUsuariosInternos.push({
        name: element.fullName,
        email: element.email,
        username: element.username + '@' + element.tenantDomain,
        communicationChannel: {
          email: true,
        },
      });
    });
    console.log(this.vp.listaUsuariosInternos);
    this.vp.numeroDeUsuariosInternos = usuarios.listInformation.totalElements;
  }
  async enviar() {
    console.log(this.vp.signatarios);
    let assinante: boolean = false;
    this.vp.signatarios.forEach((element) => {
      if (
        element.signerType === 'MANDATORY' ||
        element.signerType === 'PIONEER'
      ) {
        assinante = true;
      }
    });
    if (!assinante) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Nenhum signatário selecionado',
      });
      return;
    }

    const draftEnvelope: envelope = {
      envelopeDraftId: '',
      name: '',
      documentsVersions: [''],
      envelopeDocuments: [{ documentVsersion: '', envelopePosition: 1 }],
      signers: this.vp.signatarios,
      instructionsToSigner: '',
      askGeolocation: this.vp.geolocalizacao
        ? 'REQUIRED_LOCATION'
        : 'DONT_ASK_LOCATION',
      daysToExpire: 120,
      envelopeBatchId: '',
      mandatoryView: this.vp.visualizacaoObrigatoria ? true : false,
      notificateAuthor: this.vp.notificarAutor ? true : false,
    };
    console.log(draftEnvelope);

    // if(this.vp.listaArquivos.length === 0){
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Aviso',
    //     detail: 'Nenhum arquivo selecionado',
    //   });
    //   return;
    // }
    // if(this.vp.signatarios.length === 0){
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Aviso',
    //     detail: 'Nenhum signatário selecionado',
    //   });
    //   return;
    // // }
    // console.log(this.vp.user_fullName);
    // console.log(this.vp.token);

    // console.log(this.vp.ged_pasta_pai_id);

    // let paiId = await checkFolder(
    //   this.vp.token,
    //   { name: 'Assinatura de Documentos' },
    //   this.vp.ged_pasta_pai_id
    // );
    // this.vp.ged_pasta_pai_id = paiId;

    // console.log(this.vp.ged_pasta_pai_id);
    // console.log(this.vp.listaArquivos);
    // console.log(this.vp.byteArray);
    // this.vp.Buscando_WS = true;
    // for (let i = 0; i < this.vp.listaArquivos.length; i++) {
    //   let file: Anexo = {
    //     arquivoFile: this.vp.listaArquivos[i],
    //     enviado: true,
    //     byteArray: this.vp.byteArray[i],
    //   };

    //   let retorno = await sendDocument(
    //     this.vp.ged_pasta_pai_id,
    //     file,
    //     this.vp.user_fullName,
    //     this.vp.token
    //   );
    //   console.log(retorno);
    // }
    // this.vp.listaArquivos = [];
    // this.vp.byteArray = [];
    // this.vp.Buscando_WS = false;
  }
}
