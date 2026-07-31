import { TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { DemosComponent } from './demos.component';

describe('Demos', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DemosComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
