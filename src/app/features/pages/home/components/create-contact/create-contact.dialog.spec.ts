import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactDialog } from './create-contact.dialog';

describe('CreateContactDialog', () => {
  let component: CreateContactDialog;
  let fixture: ComponentFixture<CreateContactDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContactDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContactDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
