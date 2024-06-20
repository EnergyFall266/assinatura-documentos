import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { VP_BPM } from 'src/beans/VP_BPM';
import * as fd from 'src/functions/Form_Design';
// import formValidate from 'src/functions/Form_Validate';
import { Validate_Service } from '../services/Validate_Service';
import * as wc from 'src/functions/Workflow_Cockpit';
import { Data, Info } from 'src/beans/Workflow';
import axios from 'axios';
import { ThemeService } from '../services/theme.service';
import { AnexoService, AppService, PastaService } from './app.service';
import { Messages } from 'primeng/messages';
import { checkFolder } from 'prisma_prismafunctions';
declare var workflowCockpit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, Validate_Service],
})
export class AppComponent {
  public title = 'Assinatura-Documentos';

  public vp: VP_BPM = new VP_BPM();

  constructor(private appService: AppService, private pasta: PastaService) {
    this.vp.Buscando_WS = true;
    this.appService.acao$.subscribe((retorno: any) => {
      console.log(retorno);

      let usuario = retorno.fullName;
      this.vp.user_fullName = usuario.split('+').join(' ');
      console.log(this.vp.user_fullName);

      this.vp.token = retorno.access_token;
      console.log(this.vp.token);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.vp.Buscando_WS = false;
    }, 2000);
  }
}
