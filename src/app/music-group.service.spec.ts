import { TestBed } from '@angular/core/testing';

import { MusicGroupService } from './music-group.service';

describe('MusicGroupService', () => {
  let service: MusicGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
