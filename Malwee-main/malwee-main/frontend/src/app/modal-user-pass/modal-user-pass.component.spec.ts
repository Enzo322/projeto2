import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserPassComponent } from './modal-user-pass.component';

describe('ModalUserPassComponent', () => {
  let component: ModalUserPassComponent;
  let fixture: ComponentFixture<ModalUserPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
