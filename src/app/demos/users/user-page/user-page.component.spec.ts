import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../../app.module';
import { UserPageComponent } from './user-page.component';

describe('UserPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
