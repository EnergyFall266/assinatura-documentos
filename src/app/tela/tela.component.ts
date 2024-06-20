import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';
import { AppService, PastaService } from '../app.service';
import { sendDocument } from "prisma_prismafunctions";
import { checkFolder } from "prisma_prismafunctions";
import { timeout } from 'rxjs';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss'],
})
export class TelaComponent {
  @Input() vp!: VP_BPM;
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;

  constructor(private appService: AppService, private pasta:PastaService) {}
  ngOnInit() {
    this.getUsuariosInternos();
  }

  async getUsuariosInternos() {
    let usuarios = await this.appService.usuariosInternos(this.vp.token, 0);
    console.log(usuarios.users);
    usuarios.users.forEach((element: any) => {
      this.vp.listaUsuariosInternos.push({
        nome: element.fullName,
        email: element.email,
      });
    });
    console.log(this.vp.listaUsuariosInternos);
    this.vp.numeroDeUsuariosInternos = usuarios.listInformation.totalElements;
  }
async enviar(){
console.log(this.vp.user_fullName);
console.log(this.vp.token);


console.log(this.vp.ged_pasta_pai_id);


// let folder: any = await this.pasta.pegarPastas(this.vp);
//     this.vp.ged_pasta_pai_id = folder.paiId;
//     console.log(folder);
//     console.log(this.vp.ged_pasta_pai_id);

let paiId = await checkFolder( this.vp.token, {name:"Assinatura de Documentos"}, this.vp.ged_pasta_pai_id);
this.vp.ged_pasta_pai_id = paiId;


console.log(this.vp.ged_pasta_pai_id);
console.log(this.vp.listaArquivos);
let teste={
  arquivoFile: this.vp.listaArquivos[0],
  enviado: false
}
console.log(this.vp.listaArquivos[0]);


 let retorno= await sendDocument(this.vp.ged_pasta_pai_id, teste , this.vp.user_fullName, this.vp.token);

console.log(retorno);

}
}
