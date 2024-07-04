import { Component, Input } from '@angular/core';
import { VP_BPM, envelope, envelopeDocuments } from 'src/beans/VP_BPM';
import { AppService, PastaService } from '../app.service';
import { Anexo, sendDocument } from 'prisma_prismafunctions';
import { checkFolder } from 'prisma_prismafunctions';
import { checkImportStatus } from 'prisma_prismafunctions';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss'],
})
export class TelaComponent {
  @Input() vp!: VP_BPM;
  visible: boolean = false;
  nomeEnvelope: string = '';

  constructor(private appService: AppService, private messageService: MessageService) {}
  ngOnInit() {
    this.getUsuariosInternos();
  }
dialog(){
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
  if(this.vp.listaArquivos.length === 0){
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Nenhum arquivo selecionado',
    });
    return;
  }
  if(this.vp.signatarios.length === 0){
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Nenhum signatário selecionado',
    });
    return;
  }
  this.visible = true;
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
 
    let documentosVersao = [];

    
    console.log(this.vp.user_fullName);
    console.log(this.vp.token);


    let paiId = await checkFolder(
      this.vp.token,
      { name: 'Assinatura de Documentos' },
      this.vp.ged_pasta_pai_id
    );
    this.vp.ged_pasta_pai_id = paiId;

    console.log(this.vp.ged_pasta_pai_id);
    console.log(this.vp.listaArquivos);
    console.log(this.vp.byteArray);
    let envelopeDocumentos: envelopeDocuments[] = [];
    this.vp.Buscando_WS = true;
    for (let i = 0; i < this.vp.listaArquivos.length; i++) {
      let file: Anexo = {
        arquivoFile: this.vp.listaArquivos[i],
        enviado: true,
        byteArray: this.vp.byteArray[i],
      };

      let retorno = await sendDocument(
        this.vp.ged_pasta_pai_id,
        file,
        this.vp.user_fullName,
        this.vp.token
      );
      documentosVersao.push(retorno.documentVersionId);
      envelopeDocumentos.push({
        documentVersion: retorno.documentVersionId,
        envelopePosition: i + 1,
      });
      console.log(retorno);
    }
    console.log(documentosVersao);
    const draftEnvelope: envelope = {
      envelopeDraftId: '',
      name: this.nomeEnvelope,
      documentsVersions: documentosVersao,
      envelopeDocuments: envelopeDocumentos,
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
    let envelopeDraftId = await this.appService.createEnvelope(
      draftEnvelope,
      this.vp.token
    );
    if (envelopeDraftId === undefined) {
      this.vp.Buscando_WS = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao criar envelope',
      });
      return;
    }
    console.log(envelopeDraftId);
    let send = await this.appService.sendToSign(envelopeDraftId.envelopeDraftId, this.vp.token);
    console.log(send);
    if (send === undefined) {
      console.log('Erro ao enviar envelope');
      
      this.vp.Buscando_WS = false;
      setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao enviar envelope',
      }), 5000
      }
      );
      return;
    }
    
    this.nomeEnvelope = '';
    this.vp.geolocalizacao = false;
    this.vp.visualizacaoObrigatoria = false;
    this.vp.notificarAutor = false;
    this.vp.signatarios = [];
    this.vp.listaArquivos = [];
    this.vp.byteArray = [];
    this.vp.Buscando_WS = false;

    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Envelope enviado com sucesso',
      }), 5000
      }
    );
  }
}
