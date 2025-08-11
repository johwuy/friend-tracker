import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NotesService } from '@core/services/notes.service';

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  readonly contactId = input.required<string>();
  private originalNote = '';
  notes = new FormControl<string>('');

  protected readonly placeholderText = "Add notes about family members, parents' names or anything else you want to remember...";

  get noteChanged() {
    return this.notes.dirty && this.notes.value != this.originalNote;
  }

  ngOnInit(): void {
    this.notesService.getNote(this.contactId()).subscribe( note => {
      this.notes.setValue(note.content);
      this.originalNote = note.content;
    });
  }
}
