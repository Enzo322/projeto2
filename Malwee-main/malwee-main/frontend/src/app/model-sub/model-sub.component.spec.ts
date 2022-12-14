import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSubComponent } from './model-sub.component';

describe('ModelSubComponent', () => {
  let component: ModelSubComponent;
  let fixture: ComponentFixture<ModelSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
