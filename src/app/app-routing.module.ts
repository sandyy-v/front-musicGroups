import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicGroupsComponent } from './music-groups/music-groups.component';
import { MusicGroupDefComponent } from './music-group-def/music-group-def.component';


const routes: Routes = [
  { path: 'music-groups', component: MusicGroupsComponent },
  { path: '', redirectTo: '/music-groups', pathMatch: 'full' },
  { path: 'music-group-definition/:id', component: MusicGroupDefComponent }
//   { path: '**', redirectTo: 'music-groups' },
];


@NgModule({
  declarations: [],
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
