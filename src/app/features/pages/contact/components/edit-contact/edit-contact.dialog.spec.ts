import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactDialog } from './edit-contact.dialog';

describe('EditContactDialog', () => {
  let component: EditContactDialog;
  let fixture: ComponentFixture<EditContactDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContactDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
