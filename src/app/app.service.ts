import { Injectable } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { environment } from 'src/environments/environment';
import * as gedf from 'prisma_prismafunctions';
import * as wsb from 'src/beans/WS_Beans';
import { ResponseLoadData } from 'src/beans/VP_BPM';
import { exportaG5 } from 'src/functions/WS_Axios';
import { Subject } from 'rxjs';
import { user } from '@seniorsistemas/senior-platform-data';
const STEP = environment.tarefa();

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private token: any;
  usuario: any;
  public vp: VP_BPM = new VP_BPM();
  private capturaAcao = new Subject<string>();
  acao$ = this.capturaAcao.asObservable();
  constructor() {
    user
      .getToken()
      .then((retorno) => {
        this.capturaAcao.next(retorno);
      })
      .catch((error) => {
        alert(
          'Não foi possível obter token. Verifique se a tela está sendo acessada pela plataforma Senior X.'
        );
      });
  }

async createEnvelope(){
  const axios = require('axios');
let data = JSON.stringify({
  "signers": [
    {
      "name": "Leonardo Vanzin",
      "email": "leonardo.vanzin@prismainformatica.com.br",
      "username": "leonardo@prisma-demo.com.br.seniorx",
      "orderSign": 1,
      "signerType": "PIONEER",
      "digitalCertificate": "OPTIONAL",
      "communicationChannel": {
        "email": true,
        "platform": false
      }
    },
    {
      "name": "gustavo bertoglio",
      "email": "gustavo.bertoglio@prismainformatica.com.br",
      "username": "gustavo.bertoglio@prisma-demo.com.br.seniorx",
      "photo": "https://br-com-senior-blob-service-storage.s3.sa-east-1.amazonaws.com/prisma-democombrseniorx/temp/platform/user/98e7134c-11d9-331b-8311-4667abc08ab9/336f0cdb-c1cc-4bea-98f2-d13182ef8afe-user-photo.png",
      "orderSign": 1,
      "signerType": "PIONEER",
      "digitalCertificate": "MANDATORY",
      "communicationChannel": {
        "email": true,
        "platform": false
      }
    }
  ],
  "conectors": [],
  "envelopeDocuments": [
    {
      "documentVersion": "f2a7c44d-617d-4aa5-8421-75177e41d8c3",
      "envelopePosition": 1
    },
    {
      "documentVersion": "c4e900ce-2f28-44a0-a353-1dbe73d0a523",
      "envelopePosition": 2
    }
  ],
  "envelopeDraftId": "",
  "name": "pioneira-opicional-sem(vizualização,notificar autor e localização)",
  "instructionsToSigner": "",
  "documentsVersions": [
    "f2a7c44d-617d-4aa5-8421-75177e41d8c3",
    "c4e900ce-2f28-44a0-a353-1dbe73d0a523"
  ],
  "askGeolocation": "DONT_ASK_LOCATION",
  "daysToNotify": 0,
  "daysToExpire": 120,
  "permissions": [],
  "mandatoryView": false,
  "notificateAuthor": false,
  "searchJobPosition": false
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/ecm_ged/actions/saveEnvelope',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

try {
  const response = await axios(config);
  console.log(response.data);

  return response.data;
} catch (error) {
  console.log(error);
}

}

async sendToSign(){
  const axios = require('axios');
let data = JSON.stringify({
  "envelopeDraftId": "6f9c13f1-aa0d-4e5a-8caf-4f2dbb66b051",
  "notifyUser": true,
  "sendEmail": true
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/ecm_ged/actions/sendDraftToSign',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

try {
  const response = await axios(config);
  console.log(response.data);

  return response.data;
} catch (error) {
  console.log(error);
}
}

  async usuariosInternos(
    token: any,
    paginaAtual: number,
    pesquisa: string = ''
  ) {
    const axios = require('axios');

    let data = JSON.stringify({
      pagination: {
        pageNumber: paginaAtual,
        pageSize: 5,
      },
      searchTerm: pesquisa,
      includeBlocked: true,
      ordination: {
        sortBy: 'name',
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/listUsers',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export class PastaService {

  async pegarPastas(vp: VP_BPM, pan?: string) {
    console.log();
    
    const paiId: string = await gedf.checkFolder(
      vp.token,
      {
        name: vp.ged_pasta_pai_nome,
        description: vp.ged_pasta_pai_nome,
        permissions: environment.ged_papel,
        inheritedPermission: true,
      },
      ''
    );
    if (paiId == '') {
      return;
    }

    const proId: string = await gedf.checkFolder(
      vp.token,
      {
        name: vp.GED_pasta_codigo,
        description: vp.ged_pasta_pai_id,
        parent: paiId,
        permissions: environment.ged_papel,
        inheritedPermission: true,
      },
      paiId
    );
    if (proId == '') {
      return;
    }

    if (pan) {
      const panId: string = await gedf.checkFolder(
        vp.token,
        {
          name: pan,
          description: pan,
          parent: proId,
          permissions: environment.ged_papel,
          inheritedPermission: true,
        },
        proId
      );
      if (panId == '') {
        return;
      }
      return { paiId, proId, panId };
    }

    return { paiId, proId, panId: '' };
  }
}

export class AnexoService {
  async anexoLoad(rld: ResponseLoadData): Promise<void> {
    switch (STEP) {
      case environment.s1_etapa1:
        break;
      case environment.s2_etapa2:
        if (rld.vp.anexo_id != '') {
          rld.vp.anexo_ged = (
            await gedf.folderList(0, rld.vp.token, rld.vp.anexo_id)
          ).files.map(
            (d: any): gedf.Anexo => ({
              gedId: d.id,
              arquivoGED: d,
              enviado: true,
              estadoGED: d.status == 'PUBLISHED' ? 'Publicado' : 'Pendente',
              classTemplateGED:
                d.status == 'PUBLISHED' ? 'bg-green-600' : 'bg-yellow-500',
            })
          );
        }
        break;
    }
  }
}
