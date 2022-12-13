import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelColectionComponent } from './model-colection.component';

describe('ModelColectionComponent', () => {
  let component: ModelColectionComponent;
  let fixture: ComponentFixture<ModelColectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelColectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelColectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
