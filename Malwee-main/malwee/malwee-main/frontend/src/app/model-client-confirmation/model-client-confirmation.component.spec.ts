import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelClientConfirmationComponent } from './model-client-confirmation.component';

describe('ModelClientConfirmationComponent', () => {
  let component: ModelClientConfirmationComponent;
  let fixture: ComponentFixture<ModelClientConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelClientConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelClientConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
