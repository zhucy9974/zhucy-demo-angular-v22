import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { UsersComponent } from './users.component';

describe('Users', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
