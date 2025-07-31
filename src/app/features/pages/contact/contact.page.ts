import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '@core/services/contacts.service';
import { Contact } from '@shared/models/contact';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.scss'
})
export class ContactPage implements OnInit {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar)
  private activatedRoute = inject(ActivatedRoute);
  private contactsService = inject(ContactsService);
  protected data = signal<Contact | null>(null);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fetchContact(params['id']);
    })
  }

  private fetchContact(id: string) {
    this.contactsService.getContact(id).subscribe({
      next: contact => this.data.set(contact),
      error: () => {
        this.router.navigate(['']);
        this.snackBar.open(`Failed to fetch ${id}`, 'Close');
      }
    });
  }

}
