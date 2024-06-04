import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-assinantes',
  templateUrl: './assinantes.component.html',
  styleUrls: ['./assinantes.component.scss']
})
export class AssinantesComponent {
  products: any[] = [
    {
      name: 'Product 1',
      description: 'Description 1',
      price: 100
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      price: 150
    },
    {
      name: 'Product 3',
      description: 'Description 3',
      price: 50
    },
    {
      name: 'Product 4',
      description: 'Description 4',
      price: 200
    },
    {
      name: 'Product 5',
      description: 'Description 5',
      price: 250
    },
    {
      name: 'Product 6',
      description: 'Description 6',
      price: 80
    },
    {
      name: 'Product 7',
      description: 'Description 7',
      price: 40
    },
    {
      name: 'Product 8',
      description: 'Description 8',
      price: 300
    },
    {
      name: 'Product 9',
      description: 'Description 9',
      price: 75
    },
    {
      name: 'Product 10',
      description: 'Description 10',
      price: 65
    }
  ]
  

  selectedProduct: any;

  constructor(private messageService: MessageService) {}



  selectProduct(product: any) {
      this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
  }
}
