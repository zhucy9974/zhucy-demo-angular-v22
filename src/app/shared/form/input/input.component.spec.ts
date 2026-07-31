import { TestBed } from '@angular/core/testing';

import { AppModule } from '../../../app.module';
import { InputComponent } from './input.component';

describe('Input', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(InputComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
