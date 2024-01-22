import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from '../shared/services/note.service';
import { Note } from '../shared/models/note.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from './note-card/note-card.component';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Tag } from '../shared/models/tag.model';
import { TagService } from '../shared/services/tag.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, NoteCardComponent, NgMultiSelectDropDownModule, FormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  dropdownList: Tag[] = [];
  selectedItems: Tag[] = [];
  dropdownSettings: IDropdownSettings = {};
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(private noteService: NoteService, private tagService: TagService) {}

  ngOnInit(): void {
    this.noteService.fetchNotes();
    this.noteService.getNotes().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (notes: Note[]) => {
        this.notes = notes;
      }
    );
    this.tagService.fetchTags();
    this.tagService.getTags().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (tags: Tag []) => {
        this.dropdownList = tags;
      }
    );
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  handleTagsFiltering(): void {
    if(this.selectedItems.length > 0) {
      this.noteService.fetchNotesByTag(this.selectedItems);
    }
    else {
      this.noteService.fetchNotes();
    }
  }

  clearFilter(): void {
    this.noteService.fetchNotes();
  }

  setSelectedNote(note: Note): void {
    this.noteService.setSelectedNote(note);
  }

  createNote(): void {
    this.noteService.setSelectedNote({ id: -1, title: "", content: "", active: true, tags: [] });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
