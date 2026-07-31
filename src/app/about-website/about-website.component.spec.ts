import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { AboutWebsiteComponent } from './about-website.component';

describe('AboutWebsite', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AboutWebsiteComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
