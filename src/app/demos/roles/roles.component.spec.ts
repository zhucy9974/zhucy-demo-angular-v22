import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { RolesComponent } from './roles.component';

describe('Roles', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RolesComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
