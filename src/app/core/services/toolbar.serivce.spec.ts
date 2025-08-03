import { TestBed } from '@angular/core/testing';

import { ToolbarSerivce } from './toolbar.serivce';

describe('ToolbarSerivce', () => {
  let service: ToolbarSerivce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarSerivce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
