import { Component } from '@angular/core';
import { MusicGroup } from '../models/music-group';
import { MusicGroupService } from '../music-group.service';
import { Router, RouterLink, RouterLinkActive, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { map, filter, switchMap, pairwise } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-group-def',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './music-group-def.component.html',
  styleUrl: './music-group-def.component.scss'
})
export class MusicGroupDefComponent {
  action: string = '';
  selectedId: number = -1;
  currentMusicGroup: MusicGroup = {
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
  };

  constructor(
    private route: ActivatedRoute,
    private musicGroupService: MusicGroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((urlRp: any, i) => {
          this.selectedId = urlRp.get('id');

          if (this.selectedId > -1) {
            this.action = 'Modification';
            return this.musicGroupService.getMusicGroup(this.selectedId);
          }

          this.action = 'Création';
          return of([this.currentMusicGroup]);
        })
      )
      .subscribe((datas: any) => {
        console.log('-**** def datas', datas);
        this.currentMusicGroup = datas;
      });
  }

  sendForm() {
    if (this.currentMusicGroup) {
      if (this.action == 'Création') {
        this.musicGroupService.addMusicGroup(this.currentMusicGroup)
          .subscribe(() => this.goBack());
      } else {
        this.musicGroupService.updateMusicGroup(this.currentMusicGroup)
          .subscribe(() => this.goBack());
      }
    }
  }

  goBack() {
    this.router.navigate(['/music-groups']);
  }

}
