import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Interaction, InteractionDTO, StringInteraction, StringInteractionDTO } from '@shared/models/interaction';
import { DateTime } from 'luxon';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  private readonly httpService = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5149/api/interactions';

  // Feat?: add cache.

  private stringInteracionToObject(response: StringInteraction): Interaction {
    const parsedDate = DateTime.fromISO(response.date);
    return { ...response, date: parsedDate };
  }

  private objectInteractionToString(object: Interaction | InteractionDTO): StringInteraction | StringInteractionDTO {
    return {...object, date: object.date.toISODate()!};
  }

  fectchInteractions(contactId: string): Observable<Interaction[]> {
    return this.httpService.get<StringInteraction[]>(`${this.API_URL}/${contactId}`)
      .pipe(
        map(interactions => {
          return interactions.map(interaction => this.stringInteracionToObject(interaction));
        })
      );
  }

  fetchInteraction(contactId: string, interactionId: string): Observable<Interaction> {
    return this.httpService.get<StringInteraction>(`${this.API_URL}/${contactId}/${interactionId}`)
      .pipe(
        map(interaction => this.stringInteracionToObject(interaction))
      );
  }

  updateInteraction(contactId: string, interactionId: string, dto: InteractionDTO) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body = this.objectInteractionToString(dto);
    return this.httpService.put(`${this.API_URL}/${contactId}/${interactionId}`, body, httpOptions);
  }

  deleteInteraction(contactId: string, interactionId: string) {
    return this.httpService.delete(`${this.API_URL}/${contactId}/${interactionId}`);
  }
}
