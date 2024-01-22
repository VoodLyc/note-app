import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Note } from "../models/note.model";
import { HttpClient } from "@angular/common/http";
import { Tag } from "../models/tag.model";


@Injectable({
    providedIn: 'root'
  })
export class NoteService {
    readonly BASE_URL = "http://localhost:8080/api/v1";
    private noteSubject = new BehaviorSubject<Note>({ id: -1, title: "", content: "", active: true, tags: [] });
    private notesSubject = new BehaviorSubject<Note[]>([{ id: -1, title: "", content: "", active: true, tags: [] }]);

    constructor(private http: HttpClient) {}

    fetchNotes(): void {
        this.http.get<Note[]>(`${this.BASE_URL}/notes`).subscribe(
            (notes: Note[]) => {
                this.notesSubject.next(notes);
            }
        );
    }

    fetchNotesByTag(tags: Tag[]): void {
        const tagsId: number[] = tags.map((tag) => tag.id);
        const query = tagsId.join(',');
        this.http.get<Note[]>(`${this.BASE_URL}/notes/filter?tags=${query}`).subscribe(
            (notes: Note[]) => {
                this.notesSubject.next(notes);
            }
        );
    }

    getNotes(): Observable<Note[]> {
        return this.notesSubject.asObservable();
    }

    getSelectedNote(): Observable<Note> {
        return this.noteSubject.asObservable();
    }

    getSelectedNoteId(): Observable<number> {
        return this.noteSubject.asObservable().pipe(
            map((note: Note) => {
                return note.id;
            })
        );
    }

    setSelectedNote(note: Note): void {
        this.noteSubject.next(note);
    }

    saveNote(note: Note): Observable<Note> {
        return this.http.post<Note>(`${this.BASE_URL}/notes`, note);
    }

    deleteNote(id: number): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/notes/${id}`);
    }
}