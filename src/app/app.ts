import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateContactDialog } from '@features/pages/home/components/create-contact/create-contact.dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'friend-tracker';

  private dialogService = inject(MatDialog);
  private routerService = inject(Router);
  protected isHomePath = false;

  constructor() {
    this.routerService.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.isHomePath = event.urlAfterRedirects.startsWith('/home'));
  }

  openAddContactDialog() {
    this.dialogService.open(CreateContactDialog);
  }
}
