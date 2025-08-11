import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Note } from '@shared/models/note';

interface NoteUpdateDTO {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly httpService = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5149/api/notes';

  getNote(id: string) {
    return this.httpService.get<Note>(`${this.API_URL}/${id}`);
  }

  updateNote(id: string, content: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const body: NoteUpdateDTO= {
      content: content
    };

    return this.httpService.post<Note>(`${this.API_URL}/${id}`, body, httpOptions);
  }
}
