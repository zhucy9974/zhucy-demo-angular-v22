import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { AboutMeComponent } from './about-me.component';

describe('AboutMe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutMeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
