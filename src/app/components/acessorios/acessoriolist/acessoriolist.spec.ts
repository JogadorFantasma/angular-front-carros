import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acessoriolist } from './acessoriolist';

describe('Acessoriolist', () => {
  let component: Acessoriolist;
  let fixture: ComponentFixture<Acessoriolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acessoriolist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Acessoriolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
