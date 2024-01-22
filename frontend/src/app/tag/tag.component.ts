import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tag } from '../shared/models/tag.model';
import { TagService } from '../shared/services/tag.service';
import { Subject, takeUntil } from 'rxjs';
import { TagCardComponent } from './tag-card/tag-card.component';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, TagCardComponent],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent implements OnInit, OnDestroy {
  tags: Tag[] = [];
  ngUnsubscribe: Subject<void> = new Subject();


  constructor(private tagService: TagService) {}
  
  ngOnInit(): void {
    this.tagService.fetchTags();
    this.tagService.getTags().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (tags: Tag[]) => {
        this.tags = tags;
      }
    );
  }

  addTag(): void {
    this.tagService.saveTag({id: -1, name: ""}).subscribe(
      () => {
        this.tagService.fetchTags();
      }
    );
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
