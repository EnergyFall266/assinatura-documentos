import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { deleteDocument } from 'prisma_prismafunctions';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent {
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
  constructor(private messageService: MessageService) { }


  deleteDocument(document: any) {
    this.messageService.add({ severity: 'info', summary: 'Documento Excluido', detail: document.name });
}
  onBasicUploadAuto(event:any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
}
}
