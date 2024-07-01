import { Message } from 'primeng/api';
import { Anexo } from 'prisma_prismafunctions';
import * as wsb from './WS_Beans';

// Crie aqui todas as váriaveis de processo
export interface ResponseLoadData {
  initial: number;
  tabs: number[];
  vp: VP_BPM;
}
export interface signatarios {
  name: string;
  email: string;
  phoneNumber?: string;
  username?: string;
  askGeolocation?: string;
  communicationChannel: {
    email: true;
    platform?: boolean;
    whatsapp?: boolean;
    sms?: boolean;
  };
  signerType?: string;
  orderSign?: number;
  digitalCertificate?: string;
}

export interface envelope {
  envelopeDraftId: string;
  name: string;
  documentsVersions: [string];
  envelopeDocuments: [{ documentVsersion: string; envelopePosition: number }];
  signers:signatarios [];
  instructionsToSigner: string;
  askGeolocation: string;
  daysToExpire: number;
  envelopeBatchId: string;
  mandatoryView: boolean;
  notificateAuthor: boolean;
}
export class AnexoFile {
  file: File;
  bytes: ArrayBuffer;

  constructor(file: File, bytes: ArrayBuffer) {
    this.file = file;
    this.bytes = bytes;
  }
}

export class VP_BPM {
  public overlay: boolean = true;
  public Buscando_WS: boolean = true;
  public signatarios: signatarios[] = [];
  public listaArquivos: any[] = [];
  public byteArray: any[] = [];

  public notificarAutor: boolean = false;
  public visualizacaoObrigatoria: boolean = false;
  public geolocalizacao: boolean = false;
  public listaUsuariosInternos: signatarios[] = [];
  public numeroDeUsuariosInternos: number = 0;

  public token: string = '';
  public user_fullName: string = '';
  public GED_pasta_codigo: string = '';
  public ged_pasta_pai_nome: string = 'Assinatura de Documentos';
  public GED_pasta_codigo_id: string = '';
  public ged_pasta_pai_id: string = '';

  public anexo_files: File[] = [];
  public anexo_ged: Anexo[] = [];
  public anexo_id: string = '';
  public anexo_nome: string = 'nome';

  public testecheck: boolean = true;

  public show_servicos: wsb.Servicos[] = [];

  public anexo_files_sem_GED: AnexoFile[] = [];
  public anexo_files_sem_GED_txt: string = '';
}
