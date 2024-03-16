import { Component } from '@angular/core';
import { MusicGroup } from '../models/music-group';
import { MusicGroupService } from '../music-group.service';
import {
  /* . . . */
  NgFor,
  /* . . . */
} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-groups',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './music-groups.component.html',
  styleUrl: './music-groups.component.scss'
})
export class MusicGroupsComponent {


  musicGroups: MusicGroup[] = [{
    id: 1,
    groupName: 'Nom du groupe',
    origin: 'Origine',
    city: 'Ville',
    startYear: 0,
    endYear: 0,
    founder: 'Fondateur',
    members: 0,
    musicStyle: 'Courrant musical',
    presentation: 'Presentation'
  }];
  //   musicGroups: MusicGroup[] = [];

  constructor(
    private musicGroupService: MusicGroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMusicGroups();
  }

  getMusicGroups(): void {
    this.musicGroupService.getMusicGroups()
      .subscribe(datas => {
        console.log('*/*/*/ getMusicGroups datas', datas);
        /*
        if (data.status !== 'ERROR') {

        }
        if (data.ERROR) {
          this.commonService.openPopup(data.status, data.ERROR);
        }
        this.loaded = true;
        this.onFilterChange();

        */
        this.musicGroups = datas;
      });
  }

  goMusicGroupDef(musicGroupId: number): void {
    this.router.navigate(['/music-group-definition', musicGroupId]);
  }


  onMusicGroupDelete(musicGroupId: number): void {
    if (musicGroupId && musicGroupId > -1) {
      this.musicGroupService.deleteMusicGroup(musicGroupId)
        .subscribe((datas) => {
          this.getMusicGroups();
        });
    }
  }

  onFileSelected(fileEvent: any) {
    console.log('----------- onFileSelected fileEvent', fileEvent);
  }
}
