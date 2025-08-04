import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '@core/services/contacts.service';
import { ToolbarSerivce } from '@core/services/toolbar.serivce';
import { Contact, CONTACT_LABEL_MAPPING, StringContact } from '@shared/models/contact';
import { EditContactDialog } from './components/edit-contact/edit-contact.dialog';

@Component({
  selector: 'app-contact',
  imports: [MatProgressSpinnerModule, MatDividerModule, MatTableModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar)
  private activatedRoute = inject(ActivatedRoute);
  private dialogService = inject(MatDialog);
  private contactsService = inject(ContactsService);
  private toolbarService = inject(ToolbarSerivce);

  protected readonly displayedColumns: string[] = ['label', 'value'];

  protected data = signal<Contact | null>(null);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.fetchContact(id);
      this.toolbarService.setActions([{
        icon: 'edit',
        tooltip: 'Edit contact',
        callback: () => this.openDialog(id)
      }]);
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.clearActions();
  }

  readonly dataSource = computed(() => {
    const excludeKey = new Set(['id', 'name']);

    const currentDate = this.data();
    if (!currentDate) return [];
    const birthdayString = currentDate.birthday ? currentDate.birthday.toLocaleString() : currentDate.birthday;
    const processedData: StringContact = { ...currentDate, birthday: birthdayString };
    return Object.entries(processedData).filter(([key, value]) => !excludeKey.has(key) && value).map(([key, value]) => {
      const label = CONTACT_LABEL_MAPPING[key as keyof Contact];
      return { label: label, value: value }
    })
  });

  private fetchContact(id: string) {
    this.contactsService.getContact(id).subscribe({
      next: contact => this.data.set(contact),
      error: () => {
        this.router.navigate(['']);
        this.snackBar.open(`Failed to fetch ${id}`, 'Close');
      }
    });
  }

  private openDialog = (id: string) => {
    const dialogRef = this.dialogService.open(EditContactDialog, {
      width: '50%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = this.data();
      if (!data || !result) return; // result can be null, when we close, but don't pass in a value.

      this.contactsService
        .updateContact(data.id, data, result)
        .subscribe(contact => {
          this.data.set(contact);
        });
    });
  }

}
