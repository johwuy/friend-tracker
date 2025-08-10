import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Note } from '@shared/models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly httpService = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5149/api/notes';

  getNote(id: string) {
    return this.httpService.get<Note>(`${this.API_URL}/${id}`);
  }
}
