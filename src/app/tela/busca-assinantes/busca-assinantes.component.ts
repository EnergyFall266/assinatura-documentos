import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from 'src/app/app.service';
import { VP_BPM } from 'src/beans/VP_BPM';

@Component({
  selector: 'app-busca-assinantes',
  templateUrl: './busca-assinantes.component.html',
  styleUrls: ['./busca-assinantes.component.scss'],
})
export class BuscaAssinantesComponent {
  @Input() vp!: VP_BPM;

 
  selectedUsuario: any = [];
  constructor(
    private messageService: MessageService,
    private service: AppService
  ) {}

  nomeExterno: string = '';
  emailExterno: string = '';
  telefoneExterno: string = '';
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';


  async onPageChange(event: any) {
    let paginaAtual = event.page;
    let usuarios = await this.service.usuariosInternos(
      this.vp.token,
      paginaAtual
    );

    this.vp.listaUsuariosInternos = [];
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
    this.vp.numeroDeUsuariosInternos = usuarios.listInformation.totalElements;
  }
  async buscarUsuarioInterno(event: any) {
    let pesquisa = await this.service.usuariosInternos(this.vp.token, 0, event);
    this.vp.listaUsuariosInternos = [];
    pesquisa.users.forEach((element: any) => {
      this.vp.listaUsuariosInternos.push({
        name: element.fullName,
        email: element.email,
        username: element.username + "@"+ element.tenantDomain,
        communicationChannel: {
          email: true,
        },
      });
    });
    this.vp.numeroDeUsuariosInternos = pesquisa.listInformation.totalElements;
  }

  adicionarExterno() {
    if (this.nomeExterno == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Nome do Signatário é obrigatório',
      });
      return;
    }
    if (this.emailExterno == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Email do Signatário é obrigatório',
      });
      return;
    }

if(!this.emailExterno.match(this.emailPattern) ? true : false){
  this.messageService.add({
    severity: 'warn',
    summary: 'Aviso',
    detail: 'Email inválido',
  });
  return;

}

    if (this.vp.signatarios.length == 0) {
      this.vp.signatarios.push({
        name: this.nomeExterno,
        email: this.emailExterno,
        communicationChannel: {
          email: true,
        },
      });
    } else {
      let adicionado: boolean = false;
      this.vp.signatarios.forEach((element) => {
        if (element.email == this.emailExterno) {
          adicionado = true;
        }
      });
      if (adicionado) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Signatário ' + this.emailExterno + ' já adicionado',
        });
      } else {
        this.vp.signatarios.push({
          name: this.nomeExterno,
          email: this.emailExterno,
          communicationChannel: {
            email: true,
          },
        });
      }
    }
    this.nomeExterno = '';
    this.emailExterno = '';
    this.telefoneExterno = '';
  }
  adicionarInterno() {

    if (this.vp.signatarios.length == 0) {
      this.vp.signatarios.push({
        name: this.selectedUsuario.name,
        email: this.selectedUsuario.email,
        username: this.selectedUsuario.username,
        communicationChannel: {
          email: true,
        },
      });
    } else {
      let adicionado: boolean = false;
      this.vp.signatarios.forEach((element) => {
        if (element.email == this.selectedUsuario.email) {
          adicionado = true;
        }
      });
      if (adicionado) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Signatário ' + this.selectedUsuario.email + ' já adicionado',
        });
      } else {
        this.vp.signatarios.push({
          name: this.selectedUsuario.name,
          email: this.selectedUsuario.email,
          username: this.selectedUsuario.username,
          communicationChannel: {
            email: true,
          },
        });
      }
    }
    this.selectedUsuario = [];
  }
}
