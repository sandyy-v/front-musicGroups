import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupsComponent } from './music-groups.component';

describe('MusicGroupsComponent', () => {
  let component: MusicGroupsComponent;
  let fixture: ComponentFixture<MusicGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
