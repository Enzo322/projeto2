import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelClientComponent } from './model-client.component';

describe('ModelClientComponent', () => {
  let component: ModelClientComponent;
  let fixture: ComponentFixture<ModelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
