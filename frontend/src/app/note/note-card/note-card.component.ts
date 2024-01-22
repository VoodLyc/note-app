import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../shared/models/note.model';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { NoteService } from '../../shared/services/note.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent implements OnInit, OnDestroy {
  @Input() note: Note = { id: -1, title: "", content: "", active: true, tags: [] };
  selectedId : number = 0;
  ngUnsubscribe: Subject<void> = new Subject();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getSelectedNoteId().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (id: number) => {
        this.selectedId = id;
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
