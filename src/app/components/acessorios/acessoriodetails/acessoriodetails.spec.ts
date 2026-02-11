import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acessoriodetails } from './acessoriodetails';

describe('Acessoriodetails', () => {
  let component: Acessoriodetails;
  let fixture: ComponentFixture<Acessoriodetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acessoriodetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acessoriodetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
