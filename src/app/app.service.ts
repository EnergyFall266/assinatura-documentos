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
  providedIn: 'root'
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
        this.token = retorno;

        const value = this.token.access_token;
        this.capturaAcao.next(value);
      })
      .catch((error) => {
        alert(
          'Não foi possível obter token. Verifique se a tela está sendo acessada pela plataforma Senior X.'
        );
      });
    }


 async usuariosInternos(token: any) {
   
   const axios = require('axios');
   let data = JSON.stringify({
     
     "searchTerm": "",
     "includeBlocked": false,
     "ordination": {
       "sortBy": "name"
     }
   });
   
   let config = {
     method: 'post',
     maxBodyLength: Infinity,
     url: 'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/user/queries/listUsers',
     headers: { 
       'Content-Type': 'application/json', 
       'Authorization': 'Bearer ' + token,
     },
     data : data
   };
   
  try {
   
     const response = await axios(config);
     return response.data;
     
   }
   catch (error) {
     console.log(error);
   }
 }
}

export class PastaService {

  async pegarPastas(vp: VP_BPM, pan?: string) {
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
