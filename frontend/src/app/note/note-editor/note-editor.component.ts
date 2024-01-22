import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../shared/models/note.model';
import { NoteService } from '../../shared/services/note.service';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagPreviewComponent } from '../../tag/tag-preview/tag-preview.component';
import { Tag } from '../../shared/models/tag.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagService } from '../../shared/services/tag.service';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TagPreviewComponent, NgSelectModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  note: Note = { id: -1, title: "", content: "", active: true, tags: [] };
  ngUnsubscribe: Subject<void> = new Subject();
  noteForm: FormGroup = new FormGroup({});
  tags: Tag[] = [{ id: -1, name: "" }];
  tagsOptions: Tag[] = [{ id: -1, name: "" }];
  selectedTag: Tag = { id: -1, name: "" };

  constructor(private noteService: NoteService, private tagService: TagService) { }

  ngOnInit(): void {
    this.noteService.getSelectedNote().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (note: Note) => {
        this.note = note;
        this.noteForm = new FormGroup({
          "title": new FormControl(this.note.title, [Validators.required]),
          "content": new FormControl(this.note.content)
        });
        this.tagsOptions = this.filterTags(this.tags);
      }
    );
    this.tagService.getTags().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
        this.tagsOptions = this.filterTags(this.tags);
      }
    );
  }

  saveNote(): void {
    this.note.title = this.noteForm.value["title"];
    this.note.content = this.noteForm.value["content"];
    this.noteService.saveNote(this.note).subscribe(
      (note: Note) => {
        if (this.note.id == -1) {
          this.noteService.setSelectedNote(note);
        }
        this.noteService.fetchNotes();
      }
    );
  }

  toggleActive(): void {
    this.note.active = !this.note.active;
    this.saveNote();
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.note.id).subscribe(
      () => {
        this.noteService.fetchNotes();
      }
    );
    this.noteService.setSelectedNote({ id: -1, title: "", content: "", active: true, tags: [] });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.saveNote();
    }
  }

  deleteTag(id: number): void {
    if (this.noteForm.valid) {
      this.note.tags = this.note.tags.filter((tag: Tag) => tag.id != id);
      this.noteService.saveNote(this.note).subscribe(
        () => {
          this.noteService.fetchNotes();
          this.tagsOptions = this.filterTags(this.tags);
        }
      );
    }
  }

  filterTags(tags: Tag[]): Tag[] {
    return tags.filter((tag1) => !this.note.tags.some((tag2) => tag2.id === tag1.id));
  }

  addTag(tag: Tag): void {
    if (this.noteForm.valid && tag) {
      if (tag.id != -1) {
        this.note.tags.push(tag);
        this.noteService.saveNote(this.note).subscribe(
          () => {
            this.noteService.fetchNotes();
            this.selectedTag = { id: -1, name: "" };
            this.tagsOptions = this.filterTags(this.tags);
          }
        )
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
