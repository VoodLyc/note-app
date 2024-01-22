import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Tag } from "../models/tag.model";

@Injectable({
    providedIn: 'root'
  })
export class TagService {
    readonly BASE_URL = "http://localhost:8080/api/v1";
    private tagsSubject = new BehaviorSubject<Tag[]>([{id: -1, name: "",}]);

    constructor(private http: HttpClient) {}

    fetchTags(): void {
        this.http.get<Tag[]>(`${this.BASE_URL}/tags`).subscribe(
            (tags: Tag[]) => {
                this.tagsSubject.next(tags);
            }
        );
    }

    getTags(): Observable<Tag[]> {
        return this.tagsSubject.asObservable();
    }

    saveTag(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(`${this.BASE_URL}/tags`, tag);
    }

    deleteTag(id: number): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/tags/${id}`)
    }
}