import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaAssinantesComponent } from './busca-assinantes.component';

describe('BuscaAssinantesComponent', () => {
  let component: BuscaAssinantesComponent;
  let fixture: ComponentFixture<BuscaAssinantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscaAssinantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscaAssinantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
