import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotesService } from '@core/services/notes.service';

@Component({
  selector: 'app-notes',
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  private readonly notesService = inject(NotesService);
  readonly contactId = input.required<string>();
  notes = new FormControl<string | null>(null);

  protected readonly placeholderText = "Add notes about family members, parents' names or anything else you want to remember...";

  ngOnInit(): void {
    this.notesService.getNote(this.contactId()).subscribe( note => {
      this.notes.setValue(note.content);
    });
  }
}
