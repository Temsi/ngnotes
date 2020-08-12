import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tag } from './tag';
import { Note } from  './note';
import { Observable } from  'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient) {}

  PHP_API_SERVER = "http://notes.local";

  readNotes(): Observable<Note[]>{
    return this.httpClient.get<Note[]>(`${this.PHP_API_SERVER}/api/notes`);
  }

  createNote(note: Note): Observable<Note>{
    return this.httpClient.post<Note>(`${this.PHP_API_SERVER}/api/notes`, note);
  }

  readTags(): Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(`${this.PHP_API_SERVER}/api/tags`);
  }

  createTag(tag: Tag): Observable<Tag>{
    return this.httpClient.post<Tag>(`${this.PHP_API_SERVER}/api/tags`, tag);
  }

  deleteTag(id: number){
    return this.httpClient.delete<Tag>(`${this.PHP_API_SERVER}/api/tags/${id}`);
  }

}