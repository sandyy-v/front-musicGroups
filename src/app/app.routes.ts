import { Routes } from '@angular/router';
import { MusicGroupsComponent } from './music-groups/music-groups.component';
import { MusicGroupDefComponent } from './music-group-def/music-group-def.component';

export const routes: Routes = [
  { path: 'music-groups', component: MusicGroupsComponent },
  { path: 'music-group-definition/:id', component: MusicGroupDefComponent },
  { path: '', redirectTo: '/music-groups', pathMatch: 'full' }
];
