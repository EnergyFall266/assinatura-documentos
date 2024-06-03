import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinantesComponent } from './assinantes.component';

describe('AssinantesComponent', () => {
  let component: AssinantesComponent;
  let fixture: ComponentFixture<AssinantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssinantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssinantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
