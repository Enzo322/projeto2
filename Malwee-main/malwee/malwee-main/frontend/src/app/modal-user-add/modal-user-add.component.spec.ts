import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserAddComponent } from './modal-user-add.component';

describe('ModalUserAddComponent', () => {
  let component: ModalUserAddComponent;
  let fixture: ComponentFixture<ModalUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
