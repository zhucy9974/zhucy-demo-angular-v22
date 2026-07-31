import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../../app.module';
import { GroupPageComponent } from './group-page.component';

describe('GroupPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GroupPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
