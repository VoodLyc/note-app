import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../shared/models/tag.model';

@Component({
  selector: 'app-tag-preview',
  standalone: true,
  imports: [],
  templateUrl: './tag-preview.component.html',
  styleUrl: './tag-preview.component.css'
})
export class TagPreviewComponent {
  @Input() tag: Tag = {id: -1, name: ""};
  @Output() deleteTagEvent: EventEmitter<number> = new EventEmitter<number>();

  deleteTag(): void {
    this.deleteTagEvent.emit(this.tag.id);
  }
}
