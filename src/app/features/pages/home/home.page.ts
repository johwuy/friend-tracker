import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToolbarSerivce } from '@core/services/toolbar.serivce';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { CreateContactDialog } from './components/create-contact/create-contact.dialog';

@Component({
  selector: 'app-home',
  imports: [ContactsTableComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit, OnDestroy {
  private dialogService = inject(MatDialog);
  private toolbarService = inject(ToolbarSerivce);

  ngOnInit(): void {
    this.toolbarService.setActions([{
      icon: 'person_add',
      tooltip: 'Add contact',
      callback: this.openDialog
    }]);
  }

  ngOnDestroy(): void {
    this.toolbarService.clearActions();
  }

  private openDialog = () => {
    this.dialogService.open(CreateContactDialog, {
      width: '50%'
    });
  }

}
