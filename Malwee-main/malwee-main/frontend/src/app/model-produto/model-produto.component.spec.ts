import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProdutoComponent } from './model-produto.component';

describe('ModelProdutoComponent', () => {
  let component: ModelProdutoComponent;
  let fixture: ComponentFixture<ModelProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
