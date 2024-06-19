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

  usuariosInternos: any[] = [
    {
      name: 'Signer 1',
      email: 'signer1@hotmail.com',
    },
    {
      name: 'Signer 2',
      email: 'signer2@hotmail.com',
    },
    {
      name: 'Signer 3',
      email: 'signer3@hotmail.com',
    },
    {
      name: 'Signer 4',
      email: 'signer4@hotmail.com',
    },
    {
      name: 'Signer 5',
      email: 'signer5@hotmail.com',
    },
    {
      name: 'Signer 6',
      email: 'signer6@hotmail.com',
    },
    {
      name: 'Signer 7',
      email: 'signer7@hotmail.com',
    },
    {
      name: 'Signer 8',
      email: 'signer8@hotmail.com',
    },
  ];
  selectedUsuario: any = [];
  constructor(
    private messageService: MessageService,
    private service: AppService
  ) {}

  nomeExterno: string = '';
  emailExterno: string = '';
  telefoneExterno: string = '';
  async onPageChange(event: any) {
    console.log(event);
    let paginaAtual = event.page;
    console.log(paginaAtual);
    let usuarios = await this.service.usuariosInternos(
      this.vp.token,
      paginaAtual
    );
    console.log(this.vp.listaUsuariosInternos);

    console.log(usuarios.users);
    this.vp.listaUsuariosInternos = [];
    usuarios.users.forEach((element: any) => {
      this.vp.listaUsuariosInternos.push({
        nome: element.fullName,
        email: element.email,
      });
    });
    this.vp.numeroDeUsuariosInternos = usuarios.listInformation.totalElements;
    console.log(this.vp.listaUsuariosInternos);
    console.log(this.vp.numeroDeUsuariosInternos);
  }
  async buscarUsuarioInterno(event: any) {
    console.log(event);
    let pesquisa = await this.service.usuariosInternos(this.vp.token, 0, event);
    this.vp.listaUsuariosInternos = [];
    pesquisa.users.forEach((element: any) => {
      this.vp.listaUsuariosInternos.push({
        nome: element.fullName,
        email: element.email,
      });
    });
    this.vp.numeroDeUsuariosInternos = pesquisa.listInformation.totalElements;
    console.log(this.vp.listaUsuariosInternos);
    console.log(this.vp.numeroDeUsuariosInternos);
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
    if (this.vp.signatarios.length == 0) {
      this.vp.signatarios.push({
        nome: this.nomeExterno,
        email: this.emailExterno,
        telefone: this.telefoneExterno,
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
          nome: this.nomeExterno,
          email: this.emailExterno,
          telefone: this.telefoneExterno,
        });
      }
    }
  }
  adicionarInterno() {
    console.log(this.selectedUsuario);

    if (this.vp.signatarios.length == 0) {
      this.vp.signatarios.push({
        nome: this.selectedUsuario.nome,
        email: this.selectedUsuario.email,
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
          nome: this.selectedUsuario.nome,
          email: this.selectedUsuario.email,
        });
      }
    }
  }
}
