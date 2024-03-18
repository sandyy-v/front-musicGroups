import { Component } from '@angular/core';
import { MusicGroup } from '../models/music-group';
import { MusicGroupService } from '../music-group.service';
import {
  NgFor, NgIf
} from '@angular/common';
import { Router } from '@angular/router';

import * as ExcelJS from 'exceljs';
import { of, forkJoin, Observable, from } from 'rxjs';

@Component({
  selector: 'app-music-groups',
  standalone: true,
  imports: [
    NgFor, NgIf
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

  excelElmsTypeError = '';
  musicGroupsToAddFromExcel: MusicGroup[] = [];

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
    // console.log('-- onFileSelected fileEvent', fileEvent);

    this.excelElmsTypeError = '';
    const file = fileEvent.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      this.parseExcel(arrayBuffer);
    };

    fileReader.readAsArrayBuffer(file);
  }


  parseExcel(arrayBuffer: any): void {
    let excelElmsSameTypeAsMusicGroup: boolean = true;

    const workbook = new ExcelJS.Workbook();
    workbook.xlsx.load(arrayBuffer)
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);
      if (worksheet) {
        worksheet.eachRow({ includeEmpty: false }, (row: any, rowNumber) => {
        // Process each row here

        console.log(row.values);
        console.log('- rowNumber', rowNumber);

          if(row.values) {
            // index 0 is undefined
            // check column headers to fit type MusicGroup on index 1
            if (rowNumber == 1) {
              excelElmsSameTypeAsMusicGroup = this.isExcelElmsSameTypeAsMusicGroup(row.values);
            }

            if(row.values.length) {


            if (!excelElmsSameTypeAsMusicGroup) {
              this.excelElmsTypeError = 'Le format des données du fichier ne correspond pas au format attendu.';
            }

            // index 0 is undefined
            // index 1 is column headers
            // excel elements are same type as MusicGroup
            // add excel elements to list musicGroupsToAddFromExcel
            if (rowNumber > 1 && excelElmsSameTypeAsMusicGroup) {
              let newMusicGroup: MusicGroup = {
                id: 0,
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


              for (let i = 0; i < 10; i++) {
  //                   if(i == 1) {
  //                     newMusicGroup.groupName = row.values[i];
  //                   }
                console.log('----- i', i);
                console.log('----- row.values[i];', row.values[i]);
                // index 0 is undefined
                switch(i) {
                  case 1: {
                    newMusicGroup.groupName = row.values[i];
                    break;
                  }
                  case 2: {
                    newMusicGroup.origin = row.values[i];
                    break;
                  }
                  case 3: {
                    newMusicGroup.city = row.values[i];
                    break;
                  }
                  case 4: {
                    let startYearValue = 0;
                    if (row.values[i]) {
                      startYearValue = row.values[i];
                    }
                    newMusicGroup.startYear = startYearValue;
                    break;
                  }
                  case 5: {
                    let endYearValue = 0;
                    if (row.values[i]) {
                      endYearValue = row.values[i];
                    }
                    newMusicGroup.endYear = endYearValue;
                    break;
                  }
                  case 6: {
                    let founderValue = 'Inconnu';
                    if (row.values[i]) {
                      founderValue = row.values[i];
                    }
                    newMusicGroup.founder = founderValue;
                    break;
                  }
                  case 7: {
                    let membersValue = 0;
                    if (row.values[i]) {
                      membersValue = row.values[i];
                    }
                    newMusicGroup.members = membersValue;
                    break;
                  }
                  case 8: {
                    newMusicGroup.musicStyle = row.values[i];
                    break;
                  }
                  case 9: {
                    newMusicGroup.presentation = row.values[i];
                    break;
                  }
                }

                this.musicGroupsToAddFromExcel.push(newMusicGroup);
              }
            }

            }
          }
//       console.log('musicGroupsToAdd[] = ', this.musicGroupsToAddFromExcel);
        });
      }
    });
  }

  isExcelElmsSameTypeAsMusicGroup(columnHeadersRowValues: any): boolean {
      let excelElmsSameTypeAsMusicGroup: boolean = true;

      for (let i = 0; i < 10; i++) {
        // index 0 is undefined
        switch(i) {
          case 1: {
            if (columnHeadersRowValues[i] != 'Nom du groupe') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 2: {
            if (columnHeadersRowValues[i] != 'Origine') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 3: {
            if (columnHeadersRowValues[i] != 'Ville') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 4: {
            if (columnHeadersRowValues[i] != 'Année début') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 5: {
            if (columnHeadersRowValues[i] != 'Année séparation') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 6: {
            if (columnHeadersRowValues[i] != 'Fondateurs') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 7: {
            if (columnHeadersRowValues[i] != 'Membres') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 8: {
            if (columnHeadersRowValues[i] != 'Courant musical') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
          case 9: {
            if (columnHeadersRowValues[i] != 'Présentation') {
              excelElmsSameTypeAsMusicGroup = false;
            }
            break;
          }
        }
      }

      return excelElmsSameTypeAsMusicGroup;
  }

  sendMusicGroupsFromExcel() {
//       console.log('-- sendMusicGroupsFromExcel musicGroupsToAdd[] = ', this.musicGroupsToAddFromExcel);
      let allQueries = this.musicGroupsToAddFromExcel.map((elm: MusicGroup) => {
        return this.musicGroupService.addMusicGroup(elm)
      });

      forkJoin(allQueries)
        .subscribe(datas => {
          this.musicGroupsToAddFromExcel = [];
          this.getMusicGroups();
        });
  }


}
