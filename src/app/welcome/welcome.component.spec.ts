import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { WelcomeComponent } from './welcome.component';

describe('Welcome', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(WelcomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
