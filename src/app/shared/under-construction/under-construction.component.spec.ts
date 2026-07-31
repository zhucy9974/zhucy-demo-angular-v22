import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../app.module';
import { UnderConstructionComponent } from './under-construction.component';

describe('UnderConstruction', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UnderConstructionComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
