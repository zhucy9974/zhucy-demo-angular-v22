import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { Page404Component } from './page404.component';

describe('Page404', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Page404Component);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
