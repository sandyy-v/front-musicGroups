import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicGroupDefComponent } from './music-group-def.component';

describe('MusicGroupDefComponent', () => {
  let component: MusicGroupDefComponent;
  let fixture: ComponentFixture<MusicGroupDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicGroupDefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicGroupDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
