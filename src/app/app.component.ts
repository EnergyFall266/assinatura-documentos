import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { VP_BPM } from 'src/beans/VP_BPM';
import * as fd from 'src/functions/Form_Design';
// import formValidate from 'src/functions/Form_Validate';
import { Validate_Service } from '../services/Validate_Service'
import * as wc from 'src/functions/Workflow_Cockpit';
import { Data, Info } from 'src/beans/Workflow';
import axios from 'axios';
import { ThemeService } from '../services/theme.service';
import { AnexoService, AppService } from './app.service';
import { Messages } from 'primeng/messages';

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

  constructor(private appService: AppService) {
    this.vp.Buscando_WS = true
    this.appService.acao$.subscribe((retorno) => {
      this.vp.token = retorno;
      console.log(this.vp.token);
      
      
    });
    
  }

   ngOnInit(){
    setTimeout(() => {
   
    this.vp.Buscando_WS = false
   }
    , 2000);
  }
}
