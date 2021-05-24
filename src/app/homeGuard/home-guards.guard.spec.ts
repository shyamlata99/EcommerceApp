import { TestBed } from '@angular/core/testing';

import { HomeGuardsGuard } from './home-guards.guard';

describe('HomeGuardsGuard', () => {
  let guard: HomeGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
