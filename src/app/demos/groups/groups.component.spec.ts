import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { GroupsComponent } from './groups.component';

describe('Groups', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(GroupsComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
