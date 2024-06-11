import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosAssinantesComponent } from './documentos-assinantes.component';

describe('DocumentosAssinantesComponent', () => {
  let component: DocumentosAssinantesComponent;
  let fixture: ComponentFixture<DocumentosAssinantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosAssinantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosAssinantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
