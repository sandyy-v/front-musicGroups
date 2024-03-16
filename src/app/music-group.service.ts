import { Injectable } from '@angular/core';
import { MusicGroup } from './models/music-group';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicGroupService {

  private musicGroupUrl = 'https://127.0.0.1:8000/api/music/groups';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO
      console.log(error);
      return of(result as T);
    };
  }

  getMusicGroupsTest(): MusicGroup[] {
    return [{
      id: 1,
      groupName: 'Nom du groupe 1',
      origin: 'Origine 1',
      city: 'Ville 1',
      startYear: 0,
      endYear: 0,
      founder: 'Fondateur 1',
      members: 0,
      musicStyle: 'Courrant musical 1',
      presentation: 'Presentation 1'
    }];
  }
  getMusicGroups(): Observable<MusicGroup[]> {
    return this.http.get<MusicGroup[]>(this.musicGroupUrl)
      .pipe(
        catchError(this.handleError<MusicGroup[]>('getMusicGroups', []))
      );
  }

  getMusicGroup(id: number): Observable<MusicGroup> {
    const url = `${this.musicGroupUrl}/${id}`;
    return this.http.get<MusicGroup>(url).pipe(
      catchError(this.handleError<MusicGroup>(`getMusicGroup id=${id}`))
    );
  }


  updateMusicGroup(musicGroup: MusicGroup): Observable<any> {
    const url = `${this.musicGroupUrl}/${musicGroup.id}`;
    return this.http.put(url, musicGroup, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateMusicGroup'))
    );
  }

  addMusicGroup(musicGroup: MusicGroup): Observable<MusicGroup> {
    let musicGroupToCreate = {
      groupName: musicGroup.groupName,
      origin: musicGroup.origin,
      city: musicGroup.city,
      startYear: musicGroup.startYear,
      endYear: musicGroup.endYear,
      founder: musicGroup.founder,
      members: musicGroup.members,
      musicStyle: musicGroup.musicStyle,
      presentation: musicGroup.presentation
    };
    return this.http.post<MusicGroup>(this.musicGroupUrl, musicGroupToCreate, this.httpOptions).pipe(
      catchError(this.handleError<MusicGroup>('addMusicGroup'))
    );
  }

  deleteMusicGroup(id: number): Observable<MusicGroup> {
    const url = `${this.musicGroupUrl}/${id}`;
    return this.http.delete<MusicGroup>(url, this.httpOptions).pipe(
      catchError(this.handleError<MusicGroup>('deleteMusicGroup'))
    );
  }
}
