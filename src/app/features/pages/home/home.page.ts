import { Component } from '@angular/core';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';

@Component({
  selector: 'app-home',
  imports: [ContactsTableComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {

}
