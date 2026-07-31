import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../../app.module';
import { SearchComponent } from './search.component';

describe('Search', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
