import { Routes } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { TagComponent } from './tag/tag.component';

export const routes: Routes = [
    { path: '', redirectTo: '/notes', pathMatch: 'full'},
    { path: 'notes', component: NoteComponent},
    { path: 'tags', component: TagComponent},
    { path: '**', redirectTo: '/notes'}
];
