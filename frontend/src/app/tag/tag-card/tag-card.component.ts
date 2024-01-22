import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../shared/models/tag.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '../../shared/services/tag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tag-card.component.html',
  styleUrl: './tag-card.component.css'
})
export class TagCardComponent implements OnInit {
  @Input() tag: Tag = {id: -1, name: "dwdwd"};
  tagForm: FormGroup = new FormGroup({});

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagForm = new FormGroup({
      "name": new FormControl(this.tag.name, [Validators.required])
    })
  }

  onSubmit(): void {
    this.saveTag();
  }

  saveTag(): void {
    this.tag.name = this.tagForm.value["name"];
    this.tagService.saveTag(this.tag).subscribe(
      (tag : Tag) => {
        this.tag.id = tag.id;
        this.tagService.fetchTags();
      }
    )
  }

  deleteTag(): void {
    this.tagService.deleteTag(this.tag.id).subscribe(
      () => {
        this.tagService.fetchTags();
      }
    )
  }

}
