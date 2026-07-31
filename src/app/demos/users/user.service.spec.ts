import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AppModule } from '../../app.module';
//fdescribe on force de ne faire que ce test.
//fit, la même principe
describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(UserService);

  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
