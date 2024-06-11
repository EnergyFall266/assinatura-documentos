import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { deleteDocument } from 'prisma_prismafunctions';

@Component({
  selector: 'app-busca-assinantes',
  templateUrl: './busca-assinantes.component.html',
  styleUrls: ['./busca-assinantes.component.scss']
})
export class BuscaAssinantesComponent {
  documents: any[] = [
    {
      name: 'Document 1',
      size: '50kb',
      type: 'PDF'
    },
    {
      name: 'Document 2',
      size: '150kb',
      type: 'PDF'
    },
    {
      name: 'Document 3',
      size: '100kb',
      type: 'PDF'
    },
    {
      name: 'Document 4',
      size: '200kb',
      type: 'PDF'
    },
    {
      name: 'Document 5',
      size: '250kb',
      type: 'PDF'
    },
    {
      name: 'Document 6',
      size: '80kb',
      type: 'PDF'
    },
    {
      name: 'Document 7',
      size: '40kb',
      type: 'PDF'
    },
    {
      name: 'Document 8',
      size: '300kb',
      type: 'PDF'
    },
    {
      name: 'Document 9',
      size: '75kb',
      type: 'PDF'
    },
    {
      name: 'Document 10',
      size: '65kb',
      type: 'PDF'
    }
  ];

  products: any[] = [
    {name:"produto 1", category:"categoria 1"},
    {name:"produto 2", category:"categoria 2"},
    {name:"produto 3", category:"categoria 3"},
    {name:"produto 4", category:"categoria 4"},
    {name:"produto 5", category:"categoria 5"},
    {name:"produto 6", category:"categoria 6"},
    {name:"produto 7", category:"categoria 7"},
    {name:"produto 8", category:"categoria 8"},
    {name:"produto 9", category:"categoria 9"},
  ]
  selectedProduct: any = [];
  constructor(private messageService: MessageService) { }
  notificar: boolean = false;
  visualizacao: boolean = false;
  localizacao: boolean = false;
  value:string = '';

  deleteDocument(document: any) {
    this.messageService.add({ severity: 'info', summary: 'Documento Excluido', detail: document.name });
}
  onBasicUploadAuto(event:any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
}
}
