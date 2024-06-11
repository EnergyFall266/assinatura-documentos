import { Component, Input } from '@angular/core';
import { VP_BPM } from 'src/beans/VP_BPM';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss']
})
export class TelaComponent {
  @Input() vp!: VP_BPM;
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;
}
