import { TestBed } from '@angular/core/testing';

import { AngularBlogService } from './angular-blog.service';

describe('AngularBlogService', () => {
  let service: AngularBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
